// Uses the existing HTTP utility — no new network layer.
import { httpGetWithoutToken } from '../utils/http_utils';
import { CMSData } from '../store/slices/cmsSlice';

// ── Cache Configuration ───────────────────────────────────────────────────────

/** localStorage key — follows the project's wwph_ prefix convention */
const CMS_CACHE_KEY = 'wwph_cms';

/** Cache TTL in milliseconds (3600 seconds = 1 hour) */
const CMS_CACHE_TTL_MS = 3_600_000;

interface CMSCacheEntry {
  data: CMSData;
  /** Unix timestamp (ms) when this cache entry expires */
  expires: number;
}

// ── Cache Helpers ─────────────────────────────────────────────────────────────

/**
 * Read from localStorage cache.
 * Returns the CMSData if the cache exists and has not expired.
 * Returns null if the cache is missing, expired, or malformed.
 */
function readCache(): CMSData | null {
  try {
    const raw = localStorage.getItem(CMS_CACHE_KEY);
    if (!raw) return null;

    const entry: CMSCacheEntry = JSON.parse(raw);

    if (
      !entry ||
      typeof entry !== 'object' ||
      typeof entry.expires !== 'number' ||
      !entry.data
    ) {
      return null;
    }

    if (Date.now() > entry.expires) {
      localStorage.removeItem(CMS_CACHE_KEY);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

/**
 * Write CMSData to localStorage with a TTL timestamp.
 * Silently swallows errors (e.g. storage quota exceeded) — cache is best-effort.
 */
function writeCache(data: CMSData): void {
  try {
    const entry: CMSCacheEntry = {
      data,
      expires: Date.now() + CMS_CACHE_TTL_MS,
    };
    localStorage.setItem(CMS_CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Storage might be full or disabled. App continues without caching.
  }
}

/** Remove the CMS cache entry (used during logout or forced refresh). */
export function clearCMSCache(): void {
  localStorage.removeItem(CMS_CACHE_KEY);
}

// ── Main Service Function ─────────────────────────────────────────────────────

export interface FetchCMSResult {
  data: CMSData | null;
  fromCache: boolean;
  error: string | null;
}

/**
 * Fetch CMS settings from the API or serve from localStorage cache.
 *
 * Flow:
 *   1. Check localStorage for a valid, unexpired cache entry.
 *   2. If cache hit → return immediately (instant warm load).
 *   3. If cache miss → call GET /api/v1/cms/settings.
 *   4. On success → write to cache, return data.
 *   5. On failure → return error (caller falls back to Redux defaults).
 *
 * The function NEVER throws. All errors are caught and returned as
 * { data: null, error: string }.
 */
export async function fetchCMSSettings(): Promise<FetchCMSResult> {
  // ── Step 1: Check localStorage cache ────────────────────────────────────
  const cached = readCache();
  if (cached) {
    return { data: cached, fromCache: true, error: null };
  }

  // ── Step 2: Fetch from API ───────────────────────────────────────────────
  try {
    // httpGetWithoutToken returns resp.data directly (the full JSON body),
    // or { error: string } on failure. Pattern verified from http_utils.js.
    const response = await httpGetWithoutToken('cms/settings');

    // Defensive check — handle both a network error and API error response
    if (!response || response.error) {
      return {
        data: null,
        fromCache: false,
        error: response?.error ?? 'CMS endpoint returned an error',
      };
    }

    if (response.status !== 'success' || !response.data) {
      return {
        data: null,
        fromCache: false,
        error: 'Unexpected CMS response format',
      };
    }

    const cmsData: CMSData = response.data;

    // Basic sanity check — the data must be a non-null object
    if (typeof cmsData !== 'object' || cmsData === null) {
      return {
        data: null,
        fromCache: false,
        error: 'CMS data is not a valid object',
      };
    }

    // ── Step 3: Write to cache ─────────────────────────────────────────────
    writeCache(cmsData);

    return { data: cmsData, fromCache: false, error: null };

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error fetching CMS';
    return { data: null, fromCache: false, error: msg };
  }
}

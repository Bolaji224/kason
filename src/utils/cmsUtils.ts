/**
 * Safely parse a JSON string stored as a CMS field value.
 * Returns the fallback array if the string is empty, malformed, or not an array.
 * Used by homepage components that store repeating-item arrays in CMS.
 */
export function safeJsonArray<T>(json: string | undefined | null, fallback: T[]): T[] {
  if (!json) return fallback;
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

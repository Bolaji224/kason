import React, { useState } from 'react';
import { useCMS } from '../hooks/useCMS';

/**
 * CMS-driven announcement banner.
 *
 * Rendered when global.announcement_active is true and
 * global.announcement_banner is a non-empty string.
 *
 * Uses position:fixed so it appears above all content without affecting
 * any existing layout, padding, or component spacing. The user can dismiss
 * it for the duration of their session (state is local, not persisted).
 *
 * Placement: rendered inside <App /> after the Router — always visible
 * on every route when active.
 */
const AnnouncementBanner: React.FC = () => {
  const { global: globalCMS } = useCMS();
  const [dismissed, setDismissed] = useState(false);

  if (!globalCMS.announcement_active || !globalCMS.announcement_banner || dismissed) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#EE009D] text-white"
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-center flex-1">
          {globalCMS.announcement_banner}
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="flex-shrink-0 text-white hover:text-pink-200 transition-colors duration-200 font-bold text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;

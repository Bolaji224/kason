import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false,
    functional: true,
  });

  useEffect(() => {
    const consent = sessionStorage.getItem("cookie_consent");
    if (!consent) setOpen(true);
  }, []);

  const acceptAll = () => {
    sessionStorage.setItem("cookie_consent", "accepted");
    sessionStorage.setItem("analytics_allowed", "true");
    sessionStorage.setItem("marketing_allowed", "true");
    sessionStorage.setItem("functional_allowed", "true");
    setOpen(false);
  };

  const rejectAll = () => {
    sessionStorage.setItem("cookie_consent", "rejected");
    sessionStorage.setItem("analytics_allowed", "false");
    sessionStorage.setItem("marketing_allowed", "false");
    sessionStorage.setItem("functional_allowed", "false");
    setOpen(false);
  };

  const savePreferences = () => {
    sessionStorage.setItem("cookie_consent", "custom");
    sessionStorage.setItem("analytics_allowed", String(preferences.analytics));
    sessionStorage.setItem("marketing_allowed", String(preferences.marketing));
    sessionStorage.setItem("functional_allowed", String(preferences.functional));
    setShowPrefs(false);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      <style>{`
        .ck-root {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
        }
        .ck-banner {
          background: #ffffff;
          border-top: 1px solid #e0e0e0;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
          width: 100%;
          box-sizing: border-box;
        }
        .ck-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 20px 40px;
          box-sizing: border-box;
        }
        .ck-text {
          flex: 1;
          min-width: 0;
        }
        .ck-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #000;
        }
        .ck-desc {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          color: #4a4a4a;
        }
        .ck-link {
          color: #0d7f4f;
          text-decoration: underline;
        }
        .ck-buttons {
          display: flex;
          flex-direction: row;
          gap: 12px;
          flex-shrink: 0;
          align-items: center;
        }
        .ck-btn {
          padding: 10px 22px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.2s;
          box-sizing: border-box;
        }
        .ck-btn-outline {
          background: #ffffff;
          border: 2px solid #0d7f4f;
          color: #0d7f4f;
        }
        .ck-btn-outline:hover {
          background: #f0faf5;
        }
        .ck-btn-solid {
          background: #0d7f4f;
          border: 2px solid #0d7f4f;
          color: #ffffff;
        }
        .ck-btn-solid:hover {
          background: #0a6a41;
        }

        /* Modal overlay */
        .ck-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 10000;
          box-sizing: border-box;
        }
        .ck-modal {
          background: #ffffff;
          border-radius: 8px;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          box-sizing: border-box;
        }
        .ck-modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ck-modal-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }
        .ck-close-btn {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #666;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }
        .ck-modal-body {
          padding: 24px;
        }
        .ck-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .ck-checkbox {
          margin-top: 3px;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          cursor: pointer;
        }
        .ck-checkbox-desc {
          font-size: 13px;
          color: #666;
          margin: 4px 0 0 0;
        }
        .ck-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: flex-end;
        }
        .ck-save-btn {
          padding: 10px 32px;
          background: #0d7f4f;
          border: none;
          color: #ffffff;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }
        .ck-save-btn:hover {
          background: #0a6a41;
        }

        /* ── Mobile: 640px and below ── */
        @media (max-width: 640px) {
          .ck-content {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px;
            gap: 16px;
          }
          .ck-buttons {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }
          .ck-btn {
            width: 100%;
            text-align: center;
            padding: 13px 16px;
            font-size: 15px;
          }
          .ck-title {
            font-size: 16px;
          }
          .ck-desc {
            font-size: 13px;
          }
          .ck-overlay {
            padding: 0;
            align-items: flex-end;
          }
          .ck-modal {
            max-height: 92vh;
            border-radius: 12px 12px 0 0;
            width: 100%;
          }
          .ck-modal-header {
            padding: 16px;
          }
          .ck-modal-body {
            padding: 16px;
          }
          .ck-modal-footer {
            padding: 12px 16px;
          }
          .ck-save-btn {
            width: 100%;
            padding: 13px;
            font-size: 15px;
          }
        }
      `}</style>

      <div className="ck-root">
        <div className="ck-banner">
          <div className="ck-content">
            <div className="ck-text">
              <h2 className="ck-title">We value your privacy</h2>
              <p className="ck-desc">
                We use cookies to enhance your browsing experience, serve
                personalised ads or content, and analyse our traffic. By clicking
                "Accept All", you consent to our use of cookies.{" "}
                <a href="#" className="ck-link">
                  Cookie Policy
                </a>
              </p>
            </div>

            <div className="ck-buttons">
              <button
                className="ck-btn ck-btn-outline"
                onClick={() => setShowPrefs(!showPrefs)}
              >
                Customise
              </button>
              <button className="ck-btn ck-btn-outline" onClick={rejectAll}>
                Reject All
              </button>
              <button className="ck-btn ck-btn-solid" onClick={acceptAll}>
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPrefs && (
        <div className="ck-overlay" onClick={() => setShowPrefs(false)}>
          <div className="ck-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ck-modal-header">
              <h3 className="ck-modal-title">Cookie Preferences</h3>
              <button className="ck-close-btn" onClick={() => setShowPrefs(false)}>
                ×
              </button>
            </div>

            <div className="ck-modal-body">
              <label className="ck-checkbox-label">
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  disabled
                  className="ck-checkbox"
                />
                <div>
                  <strong>Functional Cookies</strong>
                  <p className="ck-checkbox-desc">
                    Required for the site to work (always enabled)
                  </p>
                </div>
              </label>

              <label className="ck-checkbox-label">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="ck-checkbox"
                />
                <div>
                  <strong>Analytics Cookies</strong>
                  <p className="ck-checkbox-desc">
                    Help us understand how visitors interact with our website
                  </p>
                </div>
              </label>

              <label className="ck-checkbox-label">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="ck-checkbox"
                />
                <div>
                  <strong>Marketing Cookies</strong>
                  <p className="ck-checkbox-desc">
                    Used to deliver personalized advertisements
                  </p>
                </div>
              </label>
            </div>

            <div className="ck-modal-footer">
              <button className="ck-save-btn" onClick={savePreferences}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
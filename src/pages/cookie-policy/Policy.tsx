import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

interface CookieType {
  id: string;
  icon: string;
  label: string;
  description: string;
  alwaysOn: boolean;
  color: string;
  bg: string;
  border: string;
}

interface Consents {
  analytics: boolean;
  preferences: boolean;
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  color: string;
  disabled: boolean;
}

const COOKIE_TYPES: CookieType[] = [
  {
    id: "necessary",
    icon: "🔒",
    label: "Strictly Necessary",
    description:
      "These cookies are essential for the platform to function correctly. They enable core features like security, authentication, and session management. These cannot be disabled.",
    alwaysOn: true,
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
  {
    id: "analytics",
    icon: "📊",
    label: "Analytical",
    description:
      "Help us understand how visitors interact with the platform by collecting anonymous usage data. This allows us to improve performance, identify issues, and optimise the user experience.",
    alwaysOn: false,
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  {
    id: "preferences",
    icon: "⚙️",
    label: "Preference",
    description:
      "Allow the platform to remember your settings and personalise your experience — such as your language, region, display preferences, and other customisations.",
    alwaysOn: false,
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
];

function Toggle({ checked, onChange, color, disabled }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange()}
      disabled={disabled}
      style={{
        width: 48,
        height: 26,
        borderRadius: 13,
        border: "none",
        background: disabled ? "#d1fae5" : checked ? color : "#d1d5db",
        cursor: disabled ? "not-allowed" : "pointer",
        position: "relative",
        transition: "background 0.25s",
        flexShrink: 0,
        outline: "none",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: checked || disabled ? 24 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.25s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
        }}
      />
    </button>
  );
}

// No props needed — uses useNavigate instead of isOpen/onClose
export default function CookiePrivacyModal() {
  const navigate = useNavigate();
  const [consents, setConsents] = useState<Consents>({ analytics: true, preferences: true });
  const [saved, setSaved] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  // Prevent body scroll while modal route is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggle = (id: string): void => {
    setConsents((prev) => ({ ...prev, [id]: !prev[id as keyof Consents] }));
  };

  const flash = (): void => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const acceptAll = (): void => {
    setConsents({ analytics: true, preferences: true });
    flash();
  };

  const declineAll = (): void => {
    setConsents({ analytics: false, preferences: false });
    flash();
  };

  const saveAndClose = (): void => {
    flash();
    setTimeout(() => navigate(-1), 800);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) navigate(-1);
  };

  return (
    <div style={s.overlay} onClick={handleOverlayClick}>
      <div style={s.modal} role="dialog" aria-modal="true" aria-label="Cookie Privacy Settings">

        {/* Header */}
        <div style={s.modalHeader}>
          <div>
            <h2 style={s.modalTitle}>Privacy &amp; Cookie Settings</h2>
            <p style={s.modalSubtitle}>Control how Workason collects and uses data.</p>
          </div>
          <button onClick={() => navigate(-1)} style={s.closeBtn} aria-label="Close">✕</button>
        </div>

        {/* Scrollable body */}
        <div style={s.modalBody}>

          {/* Notice */}
          <div style={s.noticeCard}>
            <p style={s.noticeText}>
              Workason uses cookies to enhance your browsing experience, serve personalised
              content, and analyse our traffic. By saving your preferences, you consent to
              our use of cookies in accordance with our{" "}
              <a href="#" style={s.link}>Cookies Policy</a>. You may choose to decline
              non-essential cookies; however, some features may not function as intended.
            </p>
            <p style={{ ...s.noticeText, marginBottom: 0, fontSize: 12, color: "#9ca3af" }}>
              You can manage or withdraw your consent at any time through your browser
              settings or this preferences panel.
            </p>
          </div>

          {/* Cookie type cards */}
          <div style={s.cardList}>
            {COOKIE_TYPES.map((type: CookieType) => {
              const isOn: boolean = type.alwaysOn || consents[type.id as keyof Consents] === true;
              const isExpanded: boolean = expanded === type.id;
              return (
                <div
                  key={type.id}
                  style={{
                    ...s.card,
                    borderColor: isOn ? type.border : "#e5e7eb",
                    background: isOn ? type.bg : "#fafafa",
                  }}
                >
                  <div style={s.cardHeader}>
                    <div style={s.cardLeft}>
                      <span style={s.cardIcon}>{type.icon}</span>
                      <div>
                        <p style={s.cardLabel}>{type.label}</p>
                        <p style={s.cardStatus}>
                          {type.alwaysOn ? "Always active" : isOn ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <div style={s.cardRight}>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : type.id)}
                        style={s.detailsBtn}
                      >
                        {isExpanded ? "Hide" : "Details"}
                      </button>
                      <Toggle
                        checked={isOn}
                        onChange={() => toggle(type.id)}
                        color={type.color}
                        disabled={type.alwaysOn}
                      />
                    </div>
                  </div>
                  {isExpanded && (
                    <p style={s.cardDescription}>{type.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div style={s.modalFooter}>
          {saved && <span style={s.savedText}>✓ Preferences saved</span>}
          <div style={s.footerButtons}>
            <button onClick={declineAll} style={s.btnGhost}>Decline non-essential</button>
            <button onClick={acceptAll} style={s.btnOutline}>Accept all</button>
            <button onClick={saveAndClose} style={s.btnPrimary}>Save &amp; close</button>
          </div>
        </div>

      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "1rem",
    boxSizing: "border-box",
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    width: "100%",
    maxWidth: 600,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  modalHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: "1.5rem 1.75rem 1rem",
    borderBottom: "1px solid #f3f4f6",
    flexShrink: 0,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: "0 0 4px",
    color: "#111",
    letterSpacing: "-0.3px",
  },
  modalSubtitle: {
    fontSize: 13,
    color: "#9ca3af",
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: 14,
    color: "#6b7280",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  modalBody: {
    overflowY: "auto",
    padding: "1.25rem 1.75rem",
    flex: 1,
  },
  noticeCard: {
    background: "#f8f7f4",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "1rem 1.25rem",
    marginBottom: "1.25rem",
  },
  noticeText: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: "0 0 0.5rem",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: {
    border: "1.5px solid",
    borderRadius: 12,
    padding: "1rem 1.25rem",
    transition: "border-color 0.2s, background 0.2s",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  cardLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  cardIcon: {
    fontSize: 20,
    flexShrink: 0,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: 600,
    margin: "0 0 2px",
    color: "#111",
  },
  cardStatus: {
    fontSize: 11,
    color: "#9ca3af",
    margin: 0,
  },
  cardRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  detailsBtn: {
    background: "none",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "3px 10px",
    fontSize: 12,
    color: "#6b7280",
    cursor: "pointer",
  },
  cardDescription: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.7,
    margin: "0.75rem 0 0",
    paddingTop: "0.75rem",
    borderTop: "1px solid #f3f4f6",
  },
  modalFooter: {
    padding: "1rem 1.75rem",
    borderTop: "1px solid #f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    flexShrink: 0,
  },
  savedText: {
    fontSize: 13,
    color: "#059669",
    fontWeight: 500,
  },
  footerButtons: {
    display: "flex",
    gap: 8,
    marginLeft: "auto",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnOutline: {
    background: "#fff",
    color: "#1a1a1a",
    border: "1.5px solid #1a1a1a",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
  btnGhost: {
    background: "transparent",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 13,
    cursor: "pointer",
  },
};
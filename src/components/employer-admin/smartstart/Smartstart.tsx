import { useState, ChangeEvent } from "react";
import { usePaystackPayment } from "react-paystack";
import ls from 'localstorage-slim';
import { APP_API_URL } from "../../../utils/http_utils";
import { useCMS } from "../../../hooks/useCMS";

// ── Types ──────────────────────────────────────────────────────────────────

interface FormState {
  projectType: string;
  title: string;
  description: string;
  budgetMin: string;
  budgetMax: string;
  budgetPreset: string;
  deadline: string;
  urgency: string;
  files: File[];
  refLinks: string;
  extraNotes: string;
  agreed: boolean;
}

interface BudgetPreset {
  label: string;
  min: string;
  max: string;
}

interface StepProjectProps {
  form: FormState;
  set: <K extends keyof FormState>(key: K, val: FormState[K]) => void;
  onNext: () => void;
}

interface StepBudgetProps extends StepProjectProps {
  onBack: () => void;
}

interface StepFilesProps extends StepBudgetProps {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface StepReviewProps {
  form: FormState;
  set: <K extends keyof FormState>(key: K, val: FormState[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  feeLabel: string;
  feeSubtitle: string;
  feeAmount: string;
  feeNaira: string;
  termsText: string;
  submitButton: string;
  paymentLoadingText: string;
}

interface CardProps {
  label: string;
  children: React.ReactNode;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}

interface BackButtonProps {
  onClick: () => void;
}

interface StepIndicatorProps {
  current: number;
}

// ── Constants ──────────────────────────────────────────────────────────────

const PROJECT_TYPES: string[] = [
  "Video Editing",
  "Virtual Assistant",
  "Social Media Management",
  "Copywriting",
  "Data Entry",
  "Other",
];

const BUDGET_PRESETS: BudgetPreset[] = [
  { label: "£50–100", min: "50", max: "100" },
  { label: "£100–250", min: "100", max: "250" },
  { label: "£250–500", min: "250", max: "500" },
  { label: "£500+", min: "500", max: "" },
];

const STEPS: string[] = ["Project", "Budget", "Files", "Review"];

const initialForm: FormState = {
  projectType: "Video Editing",
  title: "",
  description: "",
  budgetMin: "",
  budgetMax: "",
  budgetPreset: "",
  deadline: "",
  urgency: "",
  files: [],
  refLinks: "",
  extraNotes: "",
  agreed: false,
};

const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY!;
const SMARTSTART_AMOUNT = 78000 * 100; // ₦78,000 in kobo (£39 × ₦2,000)

// ── Root Component ─────────────────────────────────────────────────────────

export default function SmartStart(): JSX.Element {
  const { employerDashboardSmartStart: cms } = useCMS();
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const set = <K extends keyof FormState>(key: K, val: FormState[K]): void => {
    setForm((f) => ({ ...f, [key]: val }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    set("files", Array.from(e.target.files ?? []));
  };

  const [payRef] = useState(() => `smartstart_${Date.now()}`);

  const [userEmail] = useState<string>(() => {
    // 1. Plain email stored directly at login
    const plain = localStorage.getItem("email");
    if (plain) return plain;
    // 2. Encrypted user object (key is wwph_usr)
    const encUser = ls.get("wwph_usr", { decrypt: true }) as any;
    if (encUser?.email) return encUser.email;
    return "";
  });

  const initializePayment = usePaystackPayment({
    reference: payRef,
    email: userEmail,
    amount: SMARTSTART_AMOUNT,
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "NGN",
  });

  const submitToBackend = async (paymentRef: string): Promise<void> => {
    const formData = new FormData();
    formData.append("project_type", form.projectType);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("budget_min", form.budgetMin);
    formData.append("budget_max", form.budgetMax);
    formData.append("deadline", form.deadline);
    formData.append("urgency", form.urgency || "normal");
    formData.append("ref_links", form.refLinks);
    formData.append("extra_notes", form.extraNotes);
    formData.append("payment_reference", paymentRef);
    form.files.forEach((file) => { formData.append("files[]", file); });

    const token = ls.get("wwph_token", { decrypt: true });
    await fetch(`${APP_API_URL}/employer/smartstart`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  };

  const handleSubmit = (): void => {
    if (!form.agreed) {
      alert("Please agree to the terms to continue.");
      return;
    }
    if (!userEmail) {
      setError("Could not find your account email. Please log out and log back in.");
      return;
    }
    setIsLoading(true);
    try {
      initializePayment({
        onSuccess: async (reference: any) => {
          try {
            await submitToBackend(reference?.reference ?? payRef);
          } catch {
            setError("Payment received but submission failed. Contact support.");
          } finally {
            setIsLoading(false);
          }
        },
        onClose: () => { setIsLoading(false); },
      });
    } catch (err) {
      console.error("Payment init error:", err);
      setError("Could not open payment. Please refresh and try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-7 mt-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold text-gray-900 tracking-tight">Workason</span>
            <span className="bg-emerald-700 text-emerald-50 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
              {cms.header_badge}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            {cms.header_description}
          </p>
        </div>

        <StepIndicator current={step} />

        {step === 1 && <StepProject form={form} set={set} onNext={() => setStep(2)} />}
        {step === 2 && <StepBudget form={form} set={set} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && (
          <StepFiles
            form={form}
            set={set}
            handleFileChange={handleFileChange}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <StepReview
            form={form}
            set={set}
            onBack={() => setStep(3)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            feeLabel={cms.fee_label}
            feeSubtitle={cms.fee_subtitle}
            feeAmount={cms.fee_amount}
            feeNaira={cms.fee_naira}
            termsText={cms.terms_text}
            submitButton={cms.submit_button}
            paymentLoadingText={cms.payment_loading_text}
          />
        )}

        {/* Global error message */}
        {error && (
          <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step Indicator ─────────────────────────────────────────────────────────

function StepIndicator({ current }: StepIndicatorProps): JSX.Element {
  return (
    <div className="flex items-start mb-8">
      {STEPS.map((name, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={name} className="flex-1 flex flex-col items-center relative">
            <div
              className={[
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold z-10 relative",
                done ? "bg-emerald-700 text-white border border-emerald-700" : "",
                active ? "bg-white border-2 border-emerald-700 text-emerald-700" : "",
                !done && !active ? "bg-white border border-gray-300 text-gray-400" : "",
              ].join(" ")}
            >
              {done ? "✓" : n}
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={[
                  "absolute top-3.5 left-1/2 right-[-50%] h-px z-0",
                  done ? "bg-emerald-700" : "bg-gray-200",
                ].join(" ")}
              />
            )}
            <span
              className={[
                "text-[10px] mt-1.5 text-center",
                active ? "text-emerald-700 font-semibold" : "text-gray-400",
              ].join(" ")}
            >
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Project ────────────────────────────────────────────────────────

function StepProject({ form, set, onNext }: StepProjectProps): JSX.Element {
  return (
    <div>
      <Card label="Project type">
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => set("projectType", t)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-150 font-medium ${
                form.projectType === t
                  ? "bg-green-800 text-white border-green-800"
                  : "bg-green-50 text-emerald-700 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      <Card label="Project details">
        <Field label="Project title">
          <input
            className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
            type="text"
            placeholder="e.g. Edit 10 short-form videos for Instagram"
            value={form.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set("title", e.target.value)}
          />
        </Field>
        <Field label="Description">
          <textarea
            className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors resize-y min-h-24"
            placeholder="Describe what you need — style preferences, tools required, relevant context..."
            value={form.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("description", e.target.value)}
          />
        </Field>
      </Card>

      <PrimaryButton onClick={onNext}>Continue →</PrimaryButton>
    </div>
  );
}

// ── Step 2: Budget ─────────────────────────────────────────────────────────

function StepBudget({ form, set, onNext, onBack }: StepBudgetProps): JSX.Element {
  const selectPreset = (p: BudgetPreset): void => {
    set("budgetPreset", p.label);
    set("budgetMin", p.min);
    set("budgetMax", p.max);
  };

  return (
    <div>
      <Card label="Budget & timeline">
        <Field label="Budget range">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 shrink-0">£</span>
            <input
              className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
              type="number"
              placeholder="Min"
              value={form.budgetMin}
              onChange={(e: ChangeEvent<HTMLInputElement>) => set("budgetMin", e.target.value)}
            />
            <span className="text-sm text-gray-400 shrink-0">–</span>
            <input
              className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
              type="number"
              placeholder="Max"
              value={form.budgetMax}
              onChange={(e: ChangeEvent<HTMLInputElement>) => set("budgetMax", e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2.5">
            {BUDGET_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => selectPreset(p)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 font-medium ${
                  form.budgetPreset === p.label
                    ? "bg-green-800 text-white border-green-800"
                    : "bg-green-50 text-emerald-700 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          {form.budgetPreset === "£500+" && (
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Your max budget (optional)</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 shrink-0">£</span>
                <input
                  className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
                  type="number"
                  placeholder="e.g. 800000"
                  value={form.budgetMax}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set("budgetMax", e.target.value)}
                />
              </div>
            </div>
          )}
        </Field>

        <hr className="border-stone-100 my-3" />

        <Field label="Deadline">
          <input
            className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
            type="date"
            value={form.deadline}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set("deadline", e.target.value)}
          />
        </Field>
        <Field label="Urgency">
          <select
            className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
            value={form.urgency}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => set("urgency", e.target.value)}
          >
            <option value="">Select urgency level</option>
            <option value="flexible">Flexible – no rush</option>
            <option value="normal">Normal – within the deadline</option>
            <option value="urgent">Urgent – as soon as possible</option>
          </select>
        </Field>
      </Card>

      <PrimaryButton onClick={onNext}>Continue →</PrimaryButton>
      <BackButton onClick={onBack} />
    </div>
  );
}

// ── Step 3: Files ──────────────────────────────────────────────────────────

function StepFiles({ form, set, handleFileChange, onNext, onBack }: StepFilesProps): JSX.Element {
  return (
    <div>
      <Card label="Reference files & links">
        <Field label="Attach files">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl py-6 px-4 bg-stone-50 cursor-pointer hover:border-emerald-400 transition-colors text-center">
            <span className="text-2xl mb-1">📎</span>
            <span className="text-sm text-gray-500">Click to attach files</span>
            <span className="text-xs text-gray-400 mt-1">PDF, images, ZIP – max 20MB each</span>
            <input type="file" multiple className="hidden" onChange={handleFileChange} />
          </label>
          {form.files.length > 0 && (
            <div className="mt-2 flex flex-col gap-1.5">
              {form.files.map((f) => (
                <div key={f.name} className="flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-2">
                  <span className="text-sm">📄</span>
                  <span className="text-xs text-gray-600 truncate">{f.name}</span>
                </div>
              ))}
            </div>
          )}
        </Field>

        <Field label="Reference links (optional)">
          <input
            className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors"
            type="text"
            placeholder="Paste Google Drive, Notion, or website links..."
            value={form.refLinks}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set("refLinks", e.target.value)}
          />
        </Field>

        <Field label="Notes for our team (optional)">
          <textarea
            className="w-full text-sm text-gray-800 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 outline-none focus:border-emerald-500 transition-colors resize-y min-h-16"
            placeholder="Specific freelancer preferences, required tools, language requirements..."
            value={form.extraNotes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("extraNotes", e.target.value)}
          />
        </Field>
      </Card>

      <PrimaryButton onClick={onNext}>Review request →</PrimaryButton>
      <BackButton onClick={onBack} />
    </div>
  );
}

// ── Step 4: Review ─────────────────────────────────────────────────────────

function StepReview({ form, set, onBack, onSubmit, isLoading, feeLabel, feeSubtitle, feeAmount, feeNaira, termsText, submitButton, paymentLoadingText }: StepReviewProps): JSX.Element {
  const budget =
    form.budgetMin || form.budgetMax
      ? `£${Number(form.budgetMin || 0).toLocaleString()} – £${Number(form.budgetMax || 0).toLocaleString()}`
      : "Not specified";

  const rows: [string, string][] = [
    ["Project type", form.projectType],
    ["Title", form.title || "—"],
    ["Budget", budget],
    ["Deadline", form.deadline || "—"],
    ["Urgency", form.urgency || "—"],
    ["Files attached", form.files.length > 0 ? `${form.files.length} file(s)` : "None"],
    ["Reference links", form.refLinks || "None"],
  ];

  return (
    <div>
      <Card label="Request summary">
        <table className="w-full">
          <tbody>
            {rows.map(([label, val]) => (
              <tr key={label} className="border-b border-stone-100 last:border-0">
                <td className="text-xs text-gray-400 py-2 pr-4 w-2/5 align-top">{label}</td>
                <td className="text-sm text-gray-800 font-medium py-2">{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Fee box */}
      <div className="flex justify-between items-center bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4">
        <div>
          <p className="text-sm font-semibold text-emerald-900">{feeLabel}</p>
          <p className="text-xs text-emerald-700 mt-0.5">{feeSubtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-emerald-900">{feeAmount}</p>
          <p className="text-xs text-emerald-700">{feeNaira}</p>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2.5 mb-4 cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 shrink-0 accent-emerald-700"
          checked={form.agreed}
          onChange={(e: ChangeEvent<HTMLInputElement>) => set("agreed", e.target.checked)}
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          {termsText}
        </span>
      </label>

      <PrimaryButton onClick={onSubmit} isLoading={isLoading} disabled={isLoading}>
        {isLoading ? paymentLoadingText : submitButton}
      </PrimaryButton>
      <BackButton onClick={onBack} />
    </div>
  );
}

// ── Success View ─────────────────────────────────────────────────────────── 
// Note: This view is only shown if the user somehow ends up back on this page
// after payment. Normally Paystack redirects to your /smartstart/callback route.

interface Stage {
  label: string;
  done: boolean;
}

function SuccessView(): JSX.Element {
  const stages: Stage[] = [
    { label: "Request submitted", done: true },
    { label: "Payment confirmed", done: true },
    { label: "Workason reviews", done: false },
    { label: "Talent Pack sent to you", done: false },
    { label: "You choose a freelancer", done: false },
    { label: "Work begins", done: false },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment successful!</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
          We're reviewing your project and will send you a curated{" "}
          <strong className="text-gray-700">Talent Pack of 3–5 verified freelancers</strong>{" "}
          within 24–48 hours. Check your email for next steps.
        </p>

        <div className="mt-8 text-left inline-flex flex-col gap-3">
          {stages.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.done ? "bg-emerald-700" : "bg-gray-300"}`} />
              <span className={`text-sm ${s.done ? "text-emerald-700 font-semibold" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shared Components ──────────────────────────────────────────────────────

function Card({ label, children }: CardProps): JSX.Element {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-3">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{label}</p>
      {children}
    </div>
  );
}

function Field({ label, children }: FieldProps): JSX.Element {
  return (
    <div className="mb-3 last:mb-0">
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function PrimaryButton({ onClick, children, disabled = false, isLoading = false }: PrimaryButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 text-sm font-semibold rounded-xl transition-all duration-150 tracking-wide
        ${disabled
          ? "bg-emerald-400 text-white cursor-not-allowed"
          : "bg-emerald-700 text-emerald-50 hover:bg-emerald-800 active:scale-95"
        }`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

function BackButton({ onClick }: BackButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="w-full mt-2 py-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
    >
      ← Back
    </button>
  );
}
import React, { useState } from 'react';
import { useCreateAppointment } from '../hooks/useQueries';

interface AppointmentProps {
  selectedService?: string;
  selectedServicePrice?: number;
  onClearService?: () => void;
}

interface FormData {
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  problemDescription: string;
}

type Step = 'form' | 'payment' | 'confirmation';

export default function Appointment({ selectedService, selectedServicePrice, onClearService }: AppointmentProps) {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    problemDescription: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [copied, setCopied] = useState(false);

  const { mutate: createAppointment, isPending } = useCreateAppointment();

  const UPI_ID = '9305831180@pthdfc';

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.trim()))
      newErrors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Valid email address is required';
    if (!formData.problemDescription.trim())
      newErrors.problemDescription = 'Please describe your concern';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep('payment');
    }
  };

  const handlePaymentConfirm = () => {
    createAppointment(
      {
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        email: formData.email,
        problemDescription: formData.problemDescription,
        selectedService: selectedService || 'General Reading',
        selectedServicePrice: BigInt(selectedServicePrice || 0),
      },
      {
        onSuccess: () => {
          setStep('confirmation');
        },
      }
    );
  };

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setStep('form');
    setFormData({
      fullName: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      problemDescription: '',
    });
    setErrors({});
    if (onClearService) onClearService();
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border bg-background text-foreground font-body text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
      errors[field] ? 'border-destructive' : 'border-border focus:border-primary'
    }`;

  return (
    <section id="appointment" className="py-16 px-4 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">
            ✦ Book a Session ✦
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Book Appointment
          </h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed">
            Fill in your details below and complete payment to confirm your reading with Ishita.
          </p>
          {selectedService && (
            <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <span className="text-primary text-sm font-medium">Selected: {selectedService}</span>
              {selectedServicePrice !== undefined && selectedServicePrice > 0 && (
                <span className="text-primary font-bold text-sm">· ₹{selectedServicePrice}</span>
              )}
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(['form', 'payment', 'confirmation'] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <div
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                  step === s
                    ? 'bg-primary text-primary-foreground'
                    : i < (['form', 'payment', 'confirmation'] as Step[]).indexOf(step)
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <span>{i + 1}</span>
                <span className="capitalize hidden sm:inline">{s}</span>
              </div>
              {i < 2 && <div className="w-6 h-px bg-border" />}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 1: FORM ── */}
        {step === 'form' && (
          <div className="crystal-card bg-card border border-border rounded-2xl p-6 md:p-8 shadow-crystal">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className={inputClass('fullName')}
                />
                {errors.fullName && (
                  <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Date of Birth <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className={inputClass('dateOfBirth')}
                />
                {errors.dateOfBirth && (
                  <p className="text-destructive text-xs mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className={inputClass('phone')}
                />
                {errors.phone && (
                  <p className="text-destructive text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Describe Your Concern <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={formData.problemDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, problemDescription: e.target.value })
                  }
                  placeholder="Share what you'd like guidance on — love, career, life path, etc."
                  rows={4}
                  className={`${inputClass('problemDescription')} resize-none`}
                />
                {errors.problemDescription && (
                  <p className="text-destructive text-xs mt-1">{errors.problemDescription}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors font-body text-base"
              >
                Proceed to Payment →
              </button>
            </form>
          </div>
        )}

        {/* ── STEP 2: PAYMENT ── */}
        {step === 'payment' && (
          <div className="crystal-card bg-card border border-border rounded-2xl p-6 md:p-8 shadow-crystal text-center">
            <div className="mb-6">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="font-display text-2xl text-foreground mb-2">Complete Payment</h3>
              <p className="text-muted-foreground font-body text-sm">
                Scan the QR code below or use the UPI ID to pay
              </p>
              {selectedServicePrice !== undefined && selectedServicePrice > 0 && (
                <div className="mt-3 inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                  <span className="text-primary font-bold text-lg">₹{selectedServicePrice}</span>
                </div>
              )}
            </div>

            {/* QR Code — original uploaded QR code image */}
            <div className="flex justify-center mb-6">
              <div className="relative rounded-2xl overflow-hidden border-4 border-primary/20 shadow-crystal">
                <img
                  src="/assets/20260224_172546-1.jpg"
                  alt="UPI Payment QR Code — Ishita Singh, UPI ID 9305831180@pthdfc"
                  className="w-72 h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/generated/qr-payment.dim_400x400.png';
                  }}
                />
              </div>
            </div>

            {/* UPI ID copy */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground font-body mb-2">UPI ID</p>
              <div className="flex items-center justify-center gap-2">
                <code className="bg-muted px-4 py-2 rounded-lg text-foreground font-mono text-sm border border-border">
                  {UPI_ID}
                </code>
                <button
                  onClick={handleCopyUPI}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors border border-primary/20"
                  title="Copy UPI ID"
                >
                  {copied ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-primary text-xs mt-1 font-body">✓ Copied to clipboard!</p>
              )}
            </div>

            {/* Payee info */}
            <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left border border-border">
              <p className="text-xs text-muted-foreground font-body mb-1">Pay to</p>
              <p className="font-semibold text-foreground font-display">Ishita Singh</p>
              <p className="text-xs text-muted-foreground font-body">Kotak Mahindra Bank · 9305831180@pthdfc</p>
            </div>

            <p className="text-xs text-muted-foreground font-body mb-6 leading-relaxed">
              After completing payment, click the button below to confirm your booking. Ishita will contact you within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-3 border border-border text-foreground rounded-xl hover:bg-muted transition-colors font-body text-sm"
              >
                ← Back
              </button>
              <button
                onClick={handlePaymentConfirm}
                disabled={isPending}
                className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors font-body text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 12h-4z" />
                    </svg>
                    Confirming…
                  </>
                ) : (
                  'I have paid — Confirm Booking ✓'
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: CONFIRMATION ── */}
        {step === 'confirmation' && (
          <div className="crystal-card bg-card border border-border rounded-2xl p-6 md:p-8 shadow-crystal text-center">
            <div className="text-6xl mb-4">🌙</div>
            <h3 className="font-display text-2xl text-foreground mb-3">Booking Confirmed!</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
              Thank you, <strong className="text-foreground">{formData.fullName}</strong>! Your appointment has been received.
              Ishita will reach out to you at <strong className="text-foreground">{formData.email}</strong> or{' '}
              <strong className="text-foreground">{formData.phone}</strong> within 24 hours to schedule your session.
            </p>
            {selectedService && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
                <p className="text-primary font-medium text-sm">{selectedService}</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground font-body mb-6">
              ✨ May the stars guide your path and the crystals amplify your intentions.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors font-body text-sm"
            >
              Book Another Session
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

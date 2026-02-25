import React, { useState } from 'react';
import { X, Mail, Sparkles, CheckCircle } from 'lucide-react';
import { useSignupNewsletter } from '../hooks/useQueries';

interface NewsletterSignupProps {
  isModal?: boolean;
  onClose?: () => void;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterSignup({ isModal = false, onClose }: NewsletterSignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  const { mutate: signup, isPending, isError } = useSignupNewsletter();

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!email.trim()) newErrors.email = 'Please enter your email';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email address';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    signup(
      { name: name.trim(), email: email.trim() },
      {
        onSuccess: (code) => {
          setDiscountCode(code);
          localStorage.setItem('newsletterSubscribed', 'true');
        },
      }
    );
  };

  const content = (
    <div className="relative">
      {/* Close button for modal */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors z-10"
        >
          <X size={16} className="text-muted-foreground" />
        </button>
      )}

      {discountCode ? (
        /* Success State */
        <div className="text-center py-4">
          <CheckCircle size={40} className="mx-auto mb-3" style={{ color: 'oklch(52% 0.12 230)' }} />
          <h3 className="font-display text-xl text-foreground mb-2">Welcome to the Crystal Family! 🌙</h3>
          <p className="text-muted-foreground font-body text-sm mb-4">
            Your exclusive discount code is:
          </p>
          <div
            className="inline-block px-6 py-3 rounded-xl font-display text-2xl font-bold tracking-widest mb-4"
            style={{
              background: 'linear-gradient(135deg, oklch(52% 0.12 230 / 0.1), oklch(72% 0.18 55 / 0.1))',
              border: '2px dashed oklch(52% 0.12 230 / 0.4)',
              color: 'oklch(40% 0.12 230)',
            }}
          >
            {discountCode}
          </div>
          <p className="text-xs text-muted-foreground font-body">
            Use this code for 10% off your first order. Happy shopping! ✨
          </p>
        </div>
      ) : (
        /* Form State */
        <>
          <div className="flex items-center gap-2 mb-1">
            <Mail size={18} style={{ color: 'oklch(72% 0.18 55)' }} />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-display">
              Exclusive Offer
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl text-foreground mb-1">
            Get 10% Off Your First Order
          </h3>
          <p className="text-muted-foreground font-body text-sm mb-5">
            Join our crystal community and receive your exclusive discount code instantly. 🌙
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-body outline-none transition-all"
                style={{
                  background: 'oklch(97% 0.008 80)',
                  border: errors.name
                    ? '1.5px solid oklch(65% 0.22 15)'
                    : '1.5px solid oklch(72% 0.1 230 / 0.3)',
                  color: 'oklch(25% 0.05 230)',
                }}
              />
              {errors.name && (
                <p className="text-xs mt-1 font-body" style={{ color: 'oklch(65% 0.22 15)' }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-body outline-none transition-all"
                style={{
                  background: 'oklch(97% 0.008 80)',
                  border: errors.email
                    ? '1.5px solid oklch(65% 0.22 15)'
                    : '1.5px solid oklch(72% 0.1 230 / 0.3)',
                  color: 'oklch(25% 0.05 230)',
                }}
              />
              {errors.email && (
                <p className="text-xs mt-1 font-body" style={{ color: 'oklch(65% 0.22 15)' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {isError && (
              <p className="text-xs font-body" style={{ color: 'oklch(65% 0.22 15)' }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-white font-display transition-all duration-300 hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, oklch(52% 0.12 230), oklch(65% 0.14 220))',
              }}
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Claim My Discount
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-muted-foreground font-body mt-3 text-center">
            No spam, ever. Unsubscribe anytime. 🌙
          </p>
        </>
      )}
    </div>
  );

  if (isModal) {
    return content;
  }

  // Banner section
  return (
    <section className="py-14 px-4" style={{ background: 'oklch(94% 0.018 220 / 0.5)' }}>
      <div className="max-w-xl mx-auto">
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'oklch(99% 0.005 80)',
            boxShadow: '0 8px 40px oklch(52% 0.12 230 / 0.12)',
            border: '1px solid oklch(72% 0.1 230 / 0.2)',
          }}
        >
          {content}
        </div>
      </div>
    </section>
  );
}

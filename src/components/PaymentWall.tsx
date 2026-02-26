import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Shield, Zap, CheckCircle2, CreditCard, Loader2, AlertCircle } from 'lucide-react';
import './PaymentWall.css';
import logoImg from '../assets/logo.png';

interface PaymentWallProps {
    userEmail: string;
    userName: string;
    onLogout: () => void;
}

export function PaymentWall({ userEmail, userName, onLogout }: PaymentWallProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePay = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Not authenticated');

            const res = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${session.access_token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Payment creation failed');
            if (data.already_paid) {
                // Refresh the page so App rechecks payment status
                window.location.reload();
                return;
            }

            // Redirect to Instamojo payment page
            if (data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                throw new Error('No payment URL returned');
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="payment-wall-wrapper">
            {/* Nav */}
            <nav className="pw-nav">
                <div className="pw-nav-inner">
                    <div className="pw-logo">
                        <img src={logoImg} alt="10xResumeAi" className="pw-logo-img" />
                        <span className="logo-text">10x</span>
                        <span className="logo-accent">Resume</span>
                        <span className="logo-ai">Ai</span>
                    </div>
                    <button className="pw-logout-btn" onClick={onLogout}>
                        Sign Out
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pw-main">
                <div className="pw-card">
                    {/* Icon */}
                    <div className="pw-icon-ring">
                        <Shield size={32} className="pw-shield-icon" />
                    </div>

                    <div className="pw-greeting">
                        Welcome back, <strong>{userName || userEmail}</strong>
                    </div>

                    <h1 className="pw-title">One-Time Premium Access</h1>
                    <p className="pw-subtitle">
                        Unlock the full power of our AI resume builder with a single one-time payment. No subscriptions. No renewals. Pay once, build forever.
                    </p>

                    {/* Price */}
                    <div className="pw-price-block">
                        <div className="pw-price">
                            <span className="pw-currency">₹</span>
                            <span className="pw-amount">10</span>
                        </div>
                        <div className="pw-price-label">One-Time · Lifetime Access</div>
                    </div>

                    {/* Features */}
                    <ul className="pw-features">
                        <li><CheckCircle2 size={16} className="pw-check" /> Unlimited AI resume generation</li>
                        <li><CheckCircle2 size={16} className="pw-check" /> 20+ premium recruiter-approved templates</li>
                        <li><CheckCircle2 size={16} className="pw-check" /> ATS optimization engine</li>
                        <li><CheckCircle2 size={16} className="pw-check" /> Instant high-quality PDF export</li>
                        <li><CheckCircle2 size={16} className="pw-check" /> Upload & parse existing resume (PDF/image)</li>
                    </ul>

                    {/* Error */}
                    {error && (
                        <div className="pw-error">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* CTA */}
                    <button
                        className="pw-pay-btn"
                        onClick={handlePay}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="pw-spinner" />
                                Connecting to payment...
                            </>
                        ) : (
                            <>
                                <CreditCard size={20} />
                                Pay ₹10 with Instamojo
                            </>
                        )}
                    </button>

                    <p className="pw-secure-note">
                        <Shield size={12} /> Secured by Instamojo · UPI, Cards, Netbanking accepted
                    </p>

                    {/* Trust badges */}
                    <div className="pw-trust-badges">
                        <div className="pw-badge-item">
                            <Zap size={14} />
                            <span>Instant Activation</span>
                        </div>
                        <div className="pw-badge-item">
                            <Shield size={14} />
                            <span>100% Secure</span>
                        </div>
                        <div className="pw-badge-item">
                            <CheckCircle2 size={14} />
                            <span>No Hidden Fees</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Ambient BG */}
            <div className="pw-bg-effects" aria-hidden="true">
                <div className="pw-blob pw-blob-1"></div>
                <div className="pw-blob pw-blob-2"></div>
            </div>
        </div>
    );
}

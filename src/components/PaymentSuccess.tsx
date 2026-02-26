import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './PaymentSuccess.css';

export function PaymentSuccess() {
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed' | 'error'>('verifying');
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        const processPayment = async () => {
            // Read query params from Instamojo redirect
            const params = new URLSearchParams(window.location.search);
            const paymentId = params.get('payment_id');
            const paymentRequestId = params.get('payment_request_id');
            const paymentStatus = params.get('payment_status');

            if (!paymentId || !paymentRequestId) {
                setStatus('error');
                setMessage('Invalid payment callback. Please contact support.');
                return;
            }

            // Optimistic check on redirect status
            if (paymentStatus && paymentStatus !== 'Credit') {
                setStatus('failed');
                setMessage('Payment was not successful. Please try again.');
                return;
            }

            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    setStatus('error');
                    setMessage('Session expired. Please log in again.');
                    return;
                }

                // Call verify-payment edge function
                const res = await fetch(
                    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${session.access_token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ payment_id: paymentId, payment_request_id: paymentRequestId }),
                    }
                );

                const data = await res.json();

                if (data.success && data.status === 'paid') {
                    setStatus('success');
                    setMessage('Payment confirmed! Redirecting you to your resume builder...');
                    // Redirect to home after 2.5s
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2500);
                } else {
                    setStatus('failed');
                    setMessage('Payment verification failed. If money was deducted, contact support.');
                }
            } catch (err) {
                console.error(err);
                setStatus('error');
                setMessage('A network error occurred. Please refresh or contact support.');
            }
        };

        processPayment();
    }, []);

    return (
        <div className="ps-wrapper">
            <nav className="ps-nav">
                <div className="ps-logo">
                    <img src={logoImg} alt="10xResumeAi" className="ps-logo-img" />
                    <span className="logo-text">10x</span>
                    <span className="logo-accent">Resume</span>
                    <span className="logo-ai">Ai</span>
                </div>
            </nav>

            <main className="ps-main">
                <div className="ps-card">
                    {status === 'verifying' && (
                        <>
                            <div className="ps-icon-ring ps-pending">
                                <Loader2 size={36} className="ps-spinner" />
                            </div>
                            <h1 className="ps-title">Verifying Payment</h1>
                            <p className="ps-msg">{message}</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="ps-icon-ring ps-success">
                                <CheckCircle2 size={36} className="ps-check" />
                            </div>
                            <h1 className="ps-title ps-title-success">Payment Successful! 🎉</h1>
                            <p className="ps-msg">{message}</p>
                            <div className="ps-loader-bar">
                                <div className="ps-loader-fill"></div>
                            </div>
                        </>
                    )}

                    {(status === 'failed' || status === 'error') && (
                        <>
                            <div className="ps-icon-ring ps-fail">
                                <XCircle size={36} className="ps-x" />
                            </div>
                            <h1 className="ps-title ps-title-fail">
                                {status === 'failed' ? 'Payment Failed' : 'Something Went Wrong'}
                            </h1>
                            <p className="ps-msg">{message}</p>
                            <button className="ps-retry-btn" onClick={() => window.location.href = '/'}>
                                Return to Home
                            </button>
                        </>
                    )}
                </div>
            </main>

            <div className="pw-bg-effects" aria-hidden="true">
                <div className="pw-blob pw-blob-1"></div>
                <div className="pw-blob pw-blob-2"></div>
            </div>
        </div>
    );
}

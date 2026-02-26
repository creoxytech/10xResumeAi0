import { LegalPage } from './LegalPage';

export function RefundPage() {
    return (
        <LegalPage title="Refund & Cancellation Policy" lastUpdated="February 27, 2026">

            <div className="legal-highlight">
                <p>This policy applies to all purchases made on <strong>10xResumeAi</strong>. Please read it carefully before completing your payment of ₹10.</p>
            </div>

            <h2>1. Overview</h2>
            <p>10xResumeAi charges a one-time access fee of <strong>₹10 (Indian Rupees)</strong> for lifetime access to the AI resume builder. Because access to the Service is granted immediately and digitally upon payment confirmation, our refund policy is subject to specific conditions outlined below.</p>

            <h2>2. No Refund Policy (General)</h2>
            <p>As a general rule, <strong>all payments are non-refundable</strong> once access has been granted. This is because:</p>
            <ul>
                <li>Access to the Service is instant and digital</li>
                <li>The product is delivered immediately upon payment</li>
                <li>The one-time fee of ₹10 is minimal and covers lifetime access</li>
            </ul>
            <p>By completing the payment, you acknowledge and agree to this policy.</p>

            <h2>3. Exceptions — When We Will Issue a Refund</h2>
            <p>Notwithstanding the general no-refund rule, we will process a full refund in the following circumstances:</p>
            <ul>
                <li><strong>Double/duplicate charge:</strong> If your account was charged more than once for the same access period</li>
                <li><strong>Payment deducted but access not granted:</strong> If your payment was confirmed by Instamojo but you were unable to access the resume builder</li>
                <li><strong>Technical failure on our end:</strong> If a verified technical error on our platform prevented you from using the Service entirely</li>
            </ul>

            <h2>4. How to Request a Refund</h2>
            <p>To request a refund under one of the eligible exceptions, please email us at <a href="mailto:creoxy.tech@gmail.com">creoxy.tech@gmail.com</a> with the subject line "Refund Request" and include:</p>
            <ul>
                <li>Your registered email address (used for Google login)</li>
                <li>The Instamojo payment ID or transaction reference number</li>
                <li>A brief description of the issue</li>
                <li>Screenshot of the payment confirmation (if available)</li>
            </ul>
            <p>We will review your request and respond within <strong>3–5 business days</strong>.</p>

            <h2>5. Refund Processing</h2>
            <p>Approved refunds will be processed through the original payment method (Instamojo) within <strong>5–10 business days</strong> of approval. The actual credit to your account depends on your bank or UPI provider's processing time, which is outside our control.</p>

            <h2>6. Cancellation Policy</h2>
            <p>Since 10xResumeAi uses a <strong>one-time payment model</strong> (not a subscription), there is nothing to "cancel." Once you pay:</p>
            <ul>
                <li>No future charges will be made to you</li>
                <li>Your access remains active as long as the platform is operational</li>
                <li>You do not need to take any action to avoid being charged again</li>
            </ul>

            <h2>7. Account Termination</h2>
            <p>If your account is terminated due to a violation of our <a href="/terms">Terms and Conditions</a>, you will not be eligible for a refund, regardless of the reason for termination.</p>

            <h2>8. Payment Gateway</h2>
            <p>Payments on 10xResumeAi are processed by <strong>Instamojo</strong>, a trusted Indian payment gateway. In case of payment disputes, you may also contact Instamojo's support directly. However, we recommend reaching out to us first at <a href="mailto:creoxy.tech@gmail.com">creoxy.tech@gmail.com</a> so we can resolve the issue quickly.</p>

            <h2>9. Changes to This Policy</h2>
            <p>We reserve the right to update this Refund & Cancellation Policy at any time. Changes will be posted on this page with a revised "last updated" date. Continued use of the Service after changes constitutes your acceptance of the updated policy.</p>

            <h2>10. Contact Us</h2>
            <p>For any payment-related concerns, refund requests, or questions about this policy, please reach out to us at:</p>
            <p><strong>Email:</strong> <a href="mailto:creoxy.tech@gmail.com">creoxy.tech@gmail.com</a></p>
            <p>We are committed to resolving any issues fairly and promptly.</p>

        </LegalPage>
    );
}

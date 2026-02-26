import { LegalPage } from './LegalPage';

export function TermsPage() {
    return (
        <LegalPage title="Terms and Conditions" lastUpdated="February 27, 2026">

            <div className="legal-highlight">
                <p>By accessing or using <strong>10xResumeAi</strong> ("the Service"), you agree to be bound by these Terms and Conditions. Please read them carefully before using the platform.</p>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>By creating an account, making a payment, or using any part of 10xResumeAi, you confirm that you are at least 18 years of age, have read and understood these Terms, and agree to be legally bound by them. If you do not agree, please do not use the Service.</p>

            <h2>2. Description of Service</h2>
            <p>10xResumeAi is an AI-powered resume builder that helps users create professional, ATS-optimized resumes through a conversational chat interface. The Service includes:</p>
            <ul>
                <li>AI-driven resume content generation and editing</li>
                <li>Access to premium resume templates</li>
                <li>ATS (Applicant Tracking System) optimization suggestions</li>
                <li>PDF export functionality</li>
                <li>Existing resume import and parsing (PDF/image)</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>Access to 10xResumeAi requires authentication via Google OAuth. You are responsible for:</p>
            <ul>
                <li>Maintaining the security of your Google account credentials</li>
                <li>All activity that occurs under your account</li>
                <li>Providing accurate and complete information</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>

            <h2>4. Payment and Access</h2>
            <p>Access to the AI resume generation features requires a <strong>one-time payment of ₹10 (Indian Rupees)</strong>. This is a lifetime access fee — there are no recurring charges, subscriptions, or hidden fees. Payments are processed securely through Instamojo, a third-party payment gateway.</p>
            <p>Access is granted immediately upon successful payment verification. If you experience issues accessing the service after payment, please contact us at <a href="mailto:creoxy.tech@gmail.com">creoxy.tech@gmail.com</a>.</p>

            <h2>5. Intellectual Property</h2>
            <p>The resume content you create using 10xResumeAi belongs to you. You retain full ownership of any resumes generated through the Service. However, by using the Service, you grant us a limited, non-exclusive licence to process your input data solely for the purpose of providing the Service.</p>
            <p>The 10xResumeAi platform, including its code, design, branding, and AI models, remains the intellectual property of the creators. You may not copy, reproduce, or redistribute any part of the platform without written permission.</p>

            <h2>6. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
                <li>Create false, misleading, or fraudulent resumes</li>
                <li>Misrepresent qualifications, experience, or credentials</li>
                <li>Attempt to reverse engineer, scrape, or exploit the AI system</li>
                <li>Violate any applicable law or regulation</li>
                <li>Harass, abuse, or harm other users or third parties</li>
                <li>Attempt to gain unauthorized access to other accounts or systems</li>
            </ul>

            <h2>7. AI-Generated Content Disclaimer</h2>
            <p>10xResumeAi uses artificial intelligence to assist in resume creation. While we strive for accuracy and quality, AI-generated content may not always be perfect. You are solely responsible for reviewing, verifying, and editing your resume before submitting it to any employer. We do not guarantee employment outcomes or interview callbacks.</p>

            <h2>8. Privacy and Data</h2>
            <p>Your personal data is handled in accordance with our Privacy Policy. We use your data only to provide the Service. We do not sell your personal information to third parties. Resume content entered into the platform is used for AI processing and resume generation only.</p>

            <h2>9. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, 10xResumeAi and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability for any claim shall not exceed the amount paid by you for the Service (₹10).</p>

            <h2>10. Modifications to the Service</h2>
            <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time. We will provide reasonable notice for significant changes. Continued use of the Service after modifications constitutes acceptance of the updated Terms.</p>

            <h2>11. Governing Law</h2>
            <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>

            <h2>12. Contact</h2>
            <p>For any questions about these Terms, please contact us at <a href="mailto:creoxy.tech@gmail.com">creoxy.tech@gmail.com</a>.</p>

        </LegalPage>
    );
}

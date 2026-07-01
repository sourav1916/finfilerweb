import React from 'react';
import LegalLayout from '../../components/public/LegalLayout';

export default function TermsAndConditions() {
  return (
    <LegalLayout title="Terms and Conditions" description="Rules and guidelines for using our services." lastUpdated="September 15, 2023">
      <h2>1. Agreement to Terms</h2>
      <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

      <h2>2. Intellectual Property</h2>
      <p>The Service and its original content, features and functionality are and will remain the exclusive property of FinFiler and its licensors. The Service is protected by copyright, trademark, and other laws.</p>

      <h2>3. User Accounts</h2>
      <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.</p>

      <h2>4. Limitation of Liability</h2>
      <p>In no event shall FinFiler, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
      
      <h2>5. Changes</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
    </LegalLayout>
  );
}

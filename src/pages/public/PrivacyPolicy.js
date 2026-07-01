import React from 'react';
import LegalLayout from '../../components/public/LegalLayout';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" description="How we handle your data." lastUpdated="October 1, 2023">
      <h2>1. Introduction</h2>
      <p>We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
      
      <h2>2. Data We Collect</h2>
      <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
      <ul>
        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
        <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
        <li><strong>Financial Data:</strong> includes bank account and payment card details.</li>
        <li><strong>Transaction Data:</strong> includes details about payments to and from you.</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
      <ul>
        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
        <li>Where we need to comply with a legal obligation.</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.</p>
    </LegalLayout>
  );
}

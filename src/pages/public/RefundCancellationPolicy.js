import React from 'react';
import LegalLayout from '../../components/public/LegalLayout';

export default function RefundCancellationPolicy() {
  return (
    <LegalLayout title="Refund & Cancellation" description="Our policy regarding refunds and service cancellations." lastUpdated="August 10, 2023">
      <h2>1. Cancellation Policy</h2>
      <p>You may cancel your service request within 24 hours of placing the order, provided the service delivery has not yet commenced. Once processing has begun or documents have been filed, cancellation may not be possible.</p>

      <h2>2. Refund Eligibility</h2>
      <p>Refunds will be provided under the following circumstances:</p>
      <ul>
        <li>If we are unable to provide the service due to unforeseen circumstances on our end.</li>
        <li>If you cancel within the stipulated 24-hour window before work begins.</li>
        <li>If double payment was accidentally made for the same service.</li>
      </ul>

      <h2>3. Non-Refundable Services</h2>
      <p>Certain services are strictly non-refundable, including but not limited to government fees paid on your behalf, completed consultations, and digital downloads. Once a filing is submitted to the government portal, the associated fees cannot be refunded.</p>

      <h2>4. Refund Process</h2>
      <p>Approved refunds will be processed within 5-7 business days and credited back to the original method of payment. If you have not received your refund after 7 days, please contact your bank or credit card company, as processing times may vary.</p>
    </LegalLayout>
  );
}

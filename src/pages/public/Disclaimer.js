import React from 'react';
import LegalLayout from '../../components/public/LegalLayout';

export default function Disclaimer() {
  return (
    <LegalLayout title="Disclaimer" description="Important legal information regarding our services." lastUpdated="January 5, 2024">
      <h2>1. General Information</h2>
      <p>The information provided by FinFiler on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>

      <h2>2. Professional Advice</h2>
      <p>The site cannot and does not contain legal or tax advice. The legal and tax information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>

      <h2>3. External Links</h2>
      <p>The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>

      <h2>4. Errors and Omissions</h2>
      <p>While we strive to ensure that the information on this site is accurate and up-to-date, we cannot guarantee that the site is free of errors or omissions. Laws and regulations change frequently, and therefore the information on this site may not reflect the most current legal developments.</p>
    </LegalLayout>
  );
}

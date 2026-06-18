export const LEGAL_POLICIES = [
  { path: '/privacy-policy', label: 'Privacy Policy', title: 'Privacy Policy' },
  { path: '/terms-and-conditions', label: 'Terms & Conditions', title: 'Terms and Conditions' },
  {
    path: '/refund-and-cancellation-policy',
    label: 'Refund & Cancellation',
    title: 'Refund and Cancellation Policy',
  },
  { path: '/data-deletion-policy', label: 'Data Deletion', title: 'Data Deletion Policy' },
  { path: '/disclaimer', label: 'Disclaimer', title: 'Disclaimer' },
  {
    path: '/grievance-redressal-policy',
    label: 'Grievance Redressal',
    title: 'Grievance Redressal Policy',
  },
];

export const LEGAL_LAST_UPDATED = 'June 18, 2026';

export const LEGAL_POLICY_PATHS = LEGAL_POLICIES.map((policy) => policy.path);

export const isLegalPolicyPath = (pathname) => LEGAL_POLICY_PATHS.includes(pathname);

export const getLegalPolicyByPath = (pathname) =>
  LEGAL_POLICIES.find((policy) => policy.path === pathname);

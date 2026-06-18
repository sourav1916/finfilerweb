import { motion } from 'framer-motion';
import {
  ShieldCheck,
  FileCheck2,
  FolderLock,
  Headphones,
  Building2,
  Receipt,
  ClipboardList,
} from 'lucide-react';

const stats = [
  { value: '10K+', label: 'Clients' },
  { value: '50+', label: 'Services' },
  { value: '98%', label: 'Satisfaction' },
];

const content = {
  login: {
    badge: 'Client Portal',
    headline: 'Manage compliance',
    highlight: 'in one place.',
    subtitle:
      'Sign in to track orders, upload documents, and stay on top of your GST, tax, and company filings.',
    features: [
      {
        icon: ClipboardList,
        title: 'Track every filing',
        desc: 'Real-time status for GST returns, ITR, and ROC compliance.',
      },
      {
        icon: FolderLock,
        title: 'Secure documents',
        desc: 'Upload PAN, Aadhaar, and certificates in your private vault.',
      },
      {
        icon: Headphones,
        title: 'Expert guidance',
        desc: 'Chartered accountants support you at every step.',
      },
    ],
  },
  register: {
    badge: 'Get Started',
    headline: 'Simplify your',
    highlight: 'compliance journey.',
    subtitle:
      'Create an account to access GST registration, ITR filing, company setup, and 50+ services — all online.',
    features: [
      {
        icon: Receipt,
        title: 'GST & tax filing',
        desc: 'Registration, returns, and income tax — handled end to end.',
      },
      {
        icon: Building2,
        title: 'Business setup',
        desc: 'Company incorporation, LLP, MSME, and trademark services.',
      },
      {
        icon: FileCheck2,
        title: '100% digital',
        desc: 'No office visits. Upload docs and track progress online.',
      },
    ],
  },
};

function AuthBrandPanel({ variant = 'login' }) {
  const { badge, headline, highlight, subtitle, features } = content[variant];

  return (
    <div
      className="hidden lg:flex lg:w-1/2 h-full min-h-0 flex-shrink-0 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0b1220 0%, #1e3a8a 55%, #1d4ed8 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, #34d399, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col justify-center h-full w-full max-w-lg mx-auto px-10 xl:px-14 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Fin<span className="text-blue-300 font-normal">Filer</span>
            </span>
            <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-blue-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
              {badge}
            </span>
          </div>

          <h2 className="text-[2rem] xl:text-[2.35rem] font-bold text-white leading-tight tracking-tight">
            {headline}
            <br />
            <span className="text-blue-300">{highlight}</span>
          </h2>
          <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-md">
            {subtitle}
          </p>
        </motion.div>

        <motion.ul
          className="mt-8 space-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <li
              key={title}
              className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3.5"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                <Icon size={18} strokeWidth={2} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{title}</span>
                <span className="block text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</span>
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-lg font-bold text-white">{value}</p>
              <p className="text-[11px] text-slate-400 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default AuthBrandPanel;

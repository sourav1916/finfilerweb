import { Link } from 'react-router-dom';
import { clientRoute } from '../../constants/routes';
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  Headphones,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import PageHeader from '../../components/public/WebsitePageHeader';
import AnimatedSection from '../../components/public/AnimatedSection';
import SEO from '../../components/public/SEO';

const contactMethods = [
  {
    label: 'Email',
    value: 'support@finfiler.com',
    hint: 'Best for detailed queries and document sharing',
    href: 'mailto:support@finfiler.com',
    action: 'Send email',
    icon: Mail,
    accent: 'text-blue-600 bg-blue-50',
    border: 'hover:border-blue-200'
  },
  {
    label: 'Phone',
    value: '+91 7002695990',
    hint: 'Speak directly with our support team',
    href: 'tel:+917002695990',
    action: 'Call now',
    icon: Phone,
    accent: 'text-emerald-600 bg-emerald-50',
    border: 'hover:border-emerald-200'
  },
  {
    label: 'Office Hours',
    value: 'Mon – Sat, 10:00 AM – 6:00 PM',
    hint: 'Indian Standard Time (IST)',
    icon: Clock,
    accent: 'text-amber-600 bg-amber-50',
    border: 'hover:border-amber-200'
  },
  {
    label: 'Office Address',
    value: 'Wahab Nagar, Sunarupatty, Kharupetia, Darrang, Assam – 784115',
    hint: 'Registered office location',
    href: 'https://maps.google.com/?q=Kharupetia+Darrang+Assam+784115',
    action: 'View on map',
    icon: MapPin,
    accent: 'text-indigo-600 bg-indigo-50',
    border: 'hover:border-indigo-200'
  },
];

const helpTopics = [
  {
    title: 'Account & login',
    desc: 'OTP issues, profile updates, or access to your client portal.',
    icon: ShieldCheck,
  },
  {
    title: 'Orders & filings',
    desc: 'Status updates, document requests, or questions about an active service.',
    icon: MessageCircle,
  },
  {
    title: 'Quick response',
    desc: 'Most support requests are answered within one business day.',
    icon: Zap,
  },
];

function Contact() {
  return (
    <>
      <SEO title="Contact Us | FinFiler" description="Reach out to FinFiler for help with your account, orders, or any support-related questions. Our team is here to assist you." />
      
      <PageHeader
        label="Support"
        title="Contact Us"
        subtitle="Reach out for help with your account, orders, or any support-related questions. Our team is here to assist you."
        centered
      />

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            
            <AnimatedSection as="aside" className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 lg:sticky lg:top-32">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 mb-6 shadow-sm">
                <Headphones size={28} strokeWidth={2} aria-hidden />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">We're here to help</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Whether you need help with an order, have a billing question, or run into a technical issue — our support team is ready to assist you.
              </p>

              <div className="bg-white rounded-xl p-5 border border-slate-200 mb-8 shadow-sm">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Looking to register or start a new service?{' '}
                  <Link to={clientRoute('/register')} className="text-indigo-600 font-semibold hover:underline">Create an account</Link> or{' '}
                  <Link to="/services" className="text-indigo-600 font-semibold hover:underline">browse services</Link> instead.
                </p>
              </div>

              <div className="flex gap-6 mb-8">
                <div>
                  <span className="block text-2xl font-bold text-slate-900 mb-1">{'< 24 hrs'}</span>
                  <span className="text-sm font-medium text-slate-500">Typical response</span>
                </div>
                <div className="w-px bg-slate-200" />
                <div>
                  <span className="block text-2xl font-bold text-slate-900 mb-1">Mon–Sat</span>
                  <span className="text-sm font-medium text-slate-500">Support days</span>
                </div>
              </div>

              <Link to={clientRoute('/login')} className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group">
                Already a client? Sign in
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((item, i) => {
                const Icon = item.icon;
                return (
                  <AnimatedSection as="article" delay={i * 0.05} key={item.label} className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${item.border}`}>
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-5 ${item.accent}`}>
                      <Icon size={24} strokeWidth={2} aria-hidden />
                    </div>
                    <span className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{item.label}</span>
                    
                    {item.href ? (
                      <a href={item.href} className="block text-lg font-bold text-slate-900 mb-2 hover:text-indigo-600 transition-colors" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold text-slate-900 mb-2">{item.value}</p>
                    )}
                    
                    <p className="text-sm text-slate-600 mb-6">{item.hint}</p>
                    
                    {item.href && item.action && (
                      <a href={item.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 group" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                        {item.action}
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden />
                      </a>
                    )}
                  </AnimatedSection>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3 block">How we can help</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Support topics</h2>
            <p className="text-lg text-slate-600">
              Use the contact details above for any of these — we'll route your request to the right team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpTopics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <AnimatedSection as="div" delay={i * 0.1} key={topic.title} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 text-slate-700 mb-6">
                    <Icon size={24} strokeWidth={2} aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{topic.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{topic.desc}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;

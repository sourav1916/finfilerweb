import { Eye, Award, Sparkles } from 'lucide-react';
import PageHeader from '../../components/public/WebsitePageHeader';
import AnimatedSection from '../../components/public/AnimatedSection';
import SEO from '../../components/public/SEO';

const values = [
  {
    title: 'Transparency',
    desc: 'Clear pricing, honest timelines, and no hidden surprises in every engagement.',
    icon: Eye,
  },
  {
    title: 'Expertise',
    desc: 'Chartered accountants and compliance professionals who understand Indian regulations.',
    icon: Award,
  },
  {
    title: 'Simplicity',
    desc: 'Digital-first processes that remove paperwork headaches from your workflow.',
    icon: Sparkles,
  },
];

function About() {
  return (
    <>
      <SEO title="About Us | FinFiler" description="Learn about FinFiler, our values, and how we are simplifying financial compliance and taxation for Indian businesses and professionals." />
      
      <PageHeader
        label="About Us"
        title="About FinFiler"
        subtitle="FinFiler is a financial services platform built to simplify compliance for entrepreneurs, professionals, and small business owners across India."
      />

      <section className="bg-slate-50 py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection as="div" className="max-w-2xl">
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  We understand that GST registration, company incorporation, and tax filing can feel overwhelming. That is why we offer end-to-end support with transparent processes and friendly experts who guide you at every step.
                </p>
                <p>
                  Whether you are launching a startup, running a growing business, or filing your personal income tax return, FinFiler is here to help you stay compliant without the hassle.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection as="div" delay={0.2} className="relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full" />
              <div className="relative bg-white rounded-3xl p-10 shadow-xl shadow-indigo-900/5 border border-slate-100 flex flex-col items-center justify-center text-center h-64 transform hover:-translate-y-2 transition-transform duration-300">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-indigo-400 mb-4">8+</span>
                <span className="text-lg font-semibold text-slate-700">Years of combined compliance expertise</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3 block">Our Values</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">What Drives Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimatedSection as="div" delay={i * 0.1} key={value.title} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

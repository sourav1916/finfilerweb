import AnimatedSection from './AnimatedSection';

function PageHeader({ label, title, subtitle, children, centered = false }) {
  return (
    <section className="bg-white pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection as="div" className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
          {label && (
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-indigo-600 tracking-wider uppercase bg-indigo-50 rounded-full">
              {label}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`mt-8 ${centered ? 'flex justify-center' : ''}`}>
              {children}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

export default PageHeader;

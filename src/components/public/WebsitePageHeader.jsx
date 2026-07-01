import AnimatedSection from './AnimatedSection';

function PageHeader({ label, title, subtitle, children, centered = false }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 pt-16 pb-12 md:pt-20 md:pb-16 border-b border-indigo-900">
      {/* Animated background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedSection as="div" className={`max-w-3xl ${centered ? 'mx-auto text-center flex flex-col items-center' : ''}`}>
          {label && (
            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-indigo-200 tracking-wider uppercase bg-indigo-900/50 border border-indigo-500/30 rounded-full shadow-sm">
              {label}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-indigo-100/90 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && (
            <div className={`mt-6 ${centered ? 'flex justify-center w-full' : ''}`}>
              {children}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

export default PageHeader;

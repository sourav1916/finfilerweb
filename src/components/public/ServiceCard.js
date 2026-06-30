import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building2, FileText, Shield, User, ArrowRight } from 'lucide-react';
import { formatCurrency, formatServiceType } from '../../utils/public/format';
import AnimatedSection from './AnimatedSection';

const typeIcons = {
  general: FileText,
  personal: User,
  business: Building2,
  protection: Shield,
  advisory: Briefcase,
};

function ServiceImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function ServiceCard({ service, index = 0 }) {
  const id = service.service_id || service.id;
  const title = service.name || service.title;
  const subtitle =
    service.description ||
    service.short ||
    `${formatServiceType(service.type)} · ${formatCurrency(service.fees)}`;
  const Icon = typeIcons[service.type] || FileText;
  const hasDiscount = Number(service.discount_value) > 0;

  return (
    <AnimatedSection
      as="article"
      delay={index * 0.05}
      className="group relative flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {service.image && (
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <ServiceImage src={service.image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {service.type && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur text-xs font-semibold text-slate-800 rounded-full shadow-sm">
              {formatServiceType(service.type)}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {!service.image && (
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Icon size={24} strokeWidth={2} />
          </div>
        )}

        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed flex-1">
          {subtitle}
        </p>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100">
          {service.fees != null ? (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900">{formatCurrency(service.fees)}</span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">{formatCurrency(service.total_fees)}</span>
              )}
            </div>
          ) : <div />}

          <Link to={`/services/${id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
            Learn More
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default ServiceCard;

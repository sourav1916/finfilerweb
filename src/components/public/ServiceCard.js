import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Building2, FileText, Shield, User, ArrowRight } from 'lucide-react';
import { formatCurrency, formatServiceType } from '../../utils/public/format';

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
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      {service.image ? (
        <div className="service-card-media">
          <ServiceImage src={service.image} alt={title} className="service-card-image" />
          {service.type && (
            <span className="service-card-badge">{formatServiceType(service.type)}</span>
          )}
        </div>
      ) : null}

      <div className="service-card-body">
        {!service.image && (
          <div className="service-card-icon">
            <Icon size={20} strokeWidth={2} />
          </div>
        )}

        <h3>{title}</h3>
        <p className="service-card-desc">{subtitle}</p>

        {service.fees != null && (
          <div className="service-card-price">
            <span className="service-card-price-value">{formatCurrency(service.fees)}</span>
            {hasDiscount && (
              <span className="service-card-price-old">{formatCurrency(service.total_fees)}</span>
            )}
          </div>
        )}

        <Link to={`/services/${id}`} className="service-card-link">
          Learn More
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
}

export default ServiceCard;

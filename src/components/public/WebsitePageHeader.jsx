import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/public/animations';

function PageHeader({ label, title, subtitle, children, centered = false }) {
  return (
    <section className="page-hero">
      <div className="container">
        <motion.div
          className={`page-header ${centered ? 'page-header--center' : ''}`}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {label && (
            <motion.span className="section-label" variants={staggerItem}>
              {label}
            </motion.span>
          )}
          <motion.h1 className="page-title" variants={staggerItem}>
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p className="page-subtitle" variants={staggerItem}>
              {subtitle}
            </motion.p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export default PageHeader;

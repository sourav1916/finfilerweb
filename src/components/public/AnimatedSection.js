import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../utils/public/animations';

function AnimatedSection({ children, className = '', delay = 0, as = 'section' }) {
  const Component = motion[as] || motion.section;

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

export default AnimatedSection;

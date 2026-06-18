import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/public/animations';

function PageTransition({ children, transitionKey }) {
  return (
    <motion.div
      key={transitionKey}
      className="page-transition"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;

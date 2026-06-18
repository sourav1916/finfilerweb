import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatedModal = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-lg',
  panelClassName = '',
  closeOnBackdrop = true,
  closeDisabled = false,
  backdropClassName = 'bg-black/50',
}) => {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute inset-0 ${backdropClassName}`}
            aria-label="Close modal"
            onClick={closeOnBackdrop && !closeDisabled ? onClose : undefined}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full ${maxWidth} ${panelClassName}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;

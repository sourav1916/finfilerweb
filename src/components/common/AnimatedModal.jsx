import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatedModal = ({
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-lg',
  panelClassName = '',
  closeOnBackdrop = false,
  closeDisabled = false,
  backdropClassName = 'bg-black/50',
}) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setBounce(false);
      document.body.style.overflow = 'unset';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(() => {
    if (closeDisabled) {
      return;
    }

    if (closeOnBackdrop) {
      onClose?.();
      return;
    }

    setBounce(true);
  }, [closeDisabled, closeOnBackdrop, onClose]);

  const panelAnimate = bounce
    ? { scale: [1, 1.045, 0.975, 1.02, 1], x: [0, -8, 8, -4, 4, 0] }
    : { opacity: 1, scale: 1, y: 0, x: 0 };

  const panelTransition = bounce
    ? { duration: 0.45, ease: 'easeOut' }
    : { duration: 0.22, ease: [0.16, 1, 0.3, 1] };

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
            aria-label="Modal backdrop"
            onClick={handleBackdropClick}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={panelAnimate}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={panelTransition}
            onAnimationComplete={() => {
              if (bounce) {
                setBounce(false);
              }
            }}
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

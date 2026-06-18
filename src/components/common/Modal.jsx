import Button from './Button';
import AnimatedModal from './AnimatedModal';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', size = 'md' }) => {
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth={sizeClass}
      panelClassName="bg-secondary rounded-lg shadow-xl border border-border overflow-hidden"
    >
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h3 className="text-xl font-semibold text-primary-foreground">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-secondary-foreground hover:text-primary-foreground text-2xl leading-none"
        >
          ×
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
      {onConfirm && (
        <div className="flex justify-end gap-2 p-4 border-t border-border">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      )}
    </AnimatedModal>
  );
};

export default Modal;

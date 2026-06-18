import { AlertTriangle, Loader2, X } from 'lucide-react';
import AnimatedModal from './AnimatedModal';

const variantStyles = {
  danger: {
    iconWrap: 'bg-red-500/10 text-red-500 border-red-500/20',
    confirmBtn: 'bg-red-600 hover:bg-red-700 text-white',
  },
  primary: {
    iconWrap: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400',
    confirmBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  },
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  const styles = variantStyles[variant] || variantStyles.danger;

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      closeDisabled={loading}
      closeOnBackdrop={!loading}
      maxWidth="max-w-md"
      panelClassName="overflow-hidden rounded-lg border border-border bg-secondary shadow-xl"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${styles.iconWrap}`}
          >
            <AlertTriangle size={18} />
          </span>
          <div>
            <h2 className="text-base font-semibold text-primary-foreground">{title}</h2>
            {message && (
              <p className="mt-1 text-sm leading-relaxed text-secondary-foreground">{message}</p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-md p-1.5 text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-60 ${styles.confirmBtn}`}
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {confirmText}
        </button>
      </div>
    </AnimatedModal>
  );
}

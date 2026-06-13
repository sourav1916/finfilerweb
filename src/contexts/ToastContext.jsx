// src/contexts/ToastContext.jsx
import React, { createContext, useContext } from 'react';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const showToast = {
    success: (message, options = {}) => {
      toast.success(message, { ...options });
    },
    
    error: (message, options = {}) => {
      toast.error(message, { ...options });
    },
    
    info: (message, options = {}) => {
      toast(message, { ...options });
    },
    
    warning: (message, options = {}) => {
      toast(message, {
        icon: '⚠️',
        ...options,
      });
    },

    loading: (message, options = {}) => {
      return toast.loading(message, { ...options });
    },

    update: (toastId, type, message, options = {}) => {
      if (type === 'success') {
        toast.success(message, { id: toastId, ...options });
      } else if (type === 'error') {
        toast.error(message, { id: toastId, ...options });
      } else {
        toast(message, { id: toastId, ...options });
      }
    },

    dismiss: (toastId) => {
      toast.dismiss(toastId);
    },
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toaster position="top-right">
        {(t) => (
          <AnimatePresence>
            {t.visible && (
              <motion.div
                layout
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-xl pointer-events-auto min-w-[300px] ${
                  t.type === 'error'
                    ? 'border-red-200 bg-red-50 text-red-700'
                    : t.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-blue-200 bg-blue-50 text-blue-700'
                }`}
              >
                {t.type === 'error' ? (
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                ) : t.type === 'success' ? (
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                ) : (
                  <Info size={16} className="mt-0.5 flex-shrink-0" />
                )}
                <span className="flex-1 font-medium">{resolveValue(t.message, t)}</span>
                <button onClick={() => toast.dismiss(t.id)} className="opacity-60 hover:opacity-100 transition-opacity">
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Toaster>
    </ToastContext.Provider>
  );
};
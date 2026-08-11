import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-center justify-between p-4 rounded-xl bg-[#161F30]/95 backdrop-blur-md border border-[#FFCC00]/30 shadow-2xl shadow-yellow-500/10 text-white"
          >
            <div className="flex items-center space-x-3">
              {toast.type === 'info' ? (
                <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#FFCC00] shrink-0" />
              )}
              <p className="text-sm font-medium tracking-wide leading-tight">
                {toast.text}
              </p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="ml-3 p-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Fermer la notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="glass relative z-10 max-w-lg w-full rounded-xl p-6 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading text-lg font-bold gradient-text">{title}</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl leading-none">&times;</button>
          </div>
          <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Modal;

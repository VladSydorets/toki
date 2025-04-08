import { AnimatePresence, motion } from "motion/react";

interface ErrorMessageProps {
  errorMessage: string;
  className?: string;
  icon?: React.ReactNode;
  ariaLive?: "polite" | "assertive" | "off";
}

export default function ErrorMessage({
  errorMessage,
  className = "",
  icon,
  ariaLive = "polite",
}: ErrorMessageProps) {
  if (!errorMessage) return null;

  return (
    <AnimatePresence>
      <motion.p
        aria-live={ariaLive}
        className={`text-xs text-red-500 flex items-center gap-1 ${className}`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
        {errorMessage}
      </motion.p>
    </AnimatePresence>
  );
}

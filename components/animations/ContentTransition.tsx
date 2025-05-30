"use client";

import type React from "react";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

interface ContentTransitionProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentTransition({
  content,
  children,
  className,
}: ContentTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={content}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={cn("", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

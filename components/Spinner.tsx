"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
interface SpinnerProps {
  size?: string;
  color?: string;
  className?: string;
}

export default function Spinner({
  size = "md",
  color = "blue",
  className,
}: SpinnerProps) {
  const sizeStyles = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2",
    xl: "w-12 h-12 border-4",
  };

  const colorMap = {
    blue: "border-blue-500",
    red: "border-red-500",
    green: "border-green-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
    gray: "border-gray-400",
  };

  const spinTransition = {
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
    duration: 1,
  };

  const spinnerSize =
    sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.md;
  const spinnerColor =
    colorMap[color as keyof typeof colorMap] || colorMap.blue;

  return (
    <motion.div
      className={cn(
        spinnerSize,
        spinnerColor,
        className,
        "rounded-full border-2 border-t-transparent"
      )}
      role="status"
      aria-label="Loading"
      animate={{ rotate: 360 }}
      transition={spinTransition}
    />
  );
}

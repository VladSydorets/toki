"use client";

import { useEffect } from "react";
import { animate } from "motion/react";

export default function ScrollToTop() {
  useEffect(() => {
    animate(window.scrollY, 0, {
      onUpdate: (value) => window.scrollTo(0, value),
      duration: 0.6,
      ease: ["easeIn", "easeOut"],
    });
  }, []);

  return null;
}

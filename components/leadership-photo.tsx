"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function LeadershipPhoto({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View photo: ${alt}`}
        className="group/photo relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden border border-border sm:h-16 sm:w-16"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="64px"
          className="object-cover grayscale transition-[filter,transform] duration-300 group-hover:grayscale-0 group-hover/photo:scale-110"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-paper/92 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.96,
                y: shouldReduceMotion ? 0 : 8,
              }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.96,
                y: shouldReduceMotion ? 0 : 8,
              }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- full-res
                  lightbox view of a per-entry photo with unknown aspect
                  ratio; plain img sizes to its intrinsic ratio without a
                  fixed container next/image's fill mode would require */}
              <img
                src={src}
                alt={alt}
                className="max-h-[78vh] max-w-[90vw] border border-border object-contain sm:max-w-[640px]"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute -top-9 right-0 font-mono text-xs uppercase tracking-wider text-ink/70 transition-colors hover:text-accent"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

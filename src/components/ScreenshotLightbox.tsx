import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type Screenshot = {
  title: string;
  src: string;
};

type ScreenshotLightboxProps = {
  screenshots: Screenshot[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ScreenshotLightbox({
  screenshots,
  activeIndex,
  onChange,
  onClose,
  returnFocusRef,
}: ScreenshotLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion() ?? false;
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocusTarget = returnFocusRef.current;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      returnFocusTarget?.focus();
    };
  }, [isOpen, returnFocusRef]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onChange((activeIndex - 1 + screenshots.length) % screenshots.length);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onChange((activeIndex + 1) % screenshots.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onChange, onClose, screenshots.length]);

  if (activeIndex === null) return null;

  const activeShot = screenshots[activeIndex];
  const previous = () => onChange((activeIndex - 1 + screenshots.length) % screenshots.length);
  const next = () => onChange((activeIndex + 1) % screenshots.length);

  return createPortal(
    <motion.div
      className="screenshot-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${activeShot.title} screenshot preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.15 : 0.3 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        className="screenshot-lightbox__close"
        type="button"
        onClick={onClose}
        aria-label="Close screenshot preview"
      >
        <X aria-hidden="true" />
      </button>
      <button
        className="screenshot-lightbox__arrow is-previous"
        type="button"
        onClick={previous}
        aria-label="Previous screenshot"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <motion.figure
        key={activeShot.src}
        className="screenshot-lightbox__figure"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: reduced ? 0.2 : 0.55, ease: EASE }}
      >
        <img src={activeShot.src} alt={`Vast browser screenshot: ${activeShot.title}`} />
        <figcaption aria-live="polite">{activeShot.title}</figcaption>
      </motion.figure>
      <button
        className="screenshot-lightbox__arrow is-next"
        type="button"
        onClick={next}
        aria-label="Next screenshot"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </motion.div>,
    document.body,
  );
}

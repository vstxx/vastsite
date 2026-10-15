import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EASE } from './motion';

const HEADLINE = 'Browser built to look and work your way.';
const WORDS = HEADLINE.split(' ');

const WORD_DELAY = 0.45;
const WORD_STAGGER = 0.16;
const WORD_DURATION = 1.25;
const HEADLINE_DONE = WORD_DELAY + (WORDS.length - 1) * WORD_STAGGER + WORD_DURATION;

// The headline first sits centred on its own, then rises by half the height the
// buttons take up (button height + gap in CSS) as they are revealed underneath.
const SETTLE_SHIFT = 36;
const SETTLE_DELAY = HEADLINE_DONE - 0.3;

export default function SceneHero() {
  const reduced = useReducedMotion() ?? false;
  const [actionsReady, setActionsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setActionsReady(true), (reduced ? 0.3 : SETTLE_DELAY + 0.4) * 1000);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const explore = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('performance');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true" />

      <div className="hero__content">
        <motion.div
          initial={{ y: reduced ? 0 : SETTLE_SHIFT }}
          animate={{ y: 0 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: EASE, delay: SETTLE_DELAY }}
        >
          <h1 id="hero-title" className="hero__title">
            {WORDS.map((word, index) => (
              <span key={index}>
                {index > 0 && ' '}
                <motion.span
                  className="hero__word"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: '0.32em', filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: reduced ? 0.4 : WORD_DURATION,
                    ease: EASE,
                    delay: reduced ? 0 : WORD_DELAY + index * WORD_STAGGER,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          className="hero__actions"
          inert={!actionsReady}
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.3 : 1, ease: EASE, delay: reduced ? 0 : SETTLE_DELAY + 0.25 }}
        >
          <a className="button button--primary" href="/releases">
            <Download className="button__icon button__icon--drop" aria-hidden="true" />
            Download
          </a>
          <a className="button button--secondary" href="#performance" onClick={explore}>
            <ArrowDown className="button__icon button__icon--drop" aria-hidden="true" />
            Explore
          </a>
        </motion.div>
      </div>
    </section>
  );
}

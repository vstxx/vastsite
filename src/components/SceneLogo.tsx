import { motion, useReducedMotion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SceneLogo() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true" />

      <motion.div
        className="hero__content"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.92, filter: 'blur(28px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: reduced ? 0.3 : 2.6, ease: EASE, delay: reduced ? 0 : 0.12 }}
      >
        <h1 id="hero-title" className="hero__wordmark">
          <span className="sr-only">Vast</span>
          <span className="hero__logo" aria-hidden="true">
            <img src="/logos/vast.png" alt="" />
          </span>
        </h1>
      </motion.div>

      <motion.div
        className="hero__scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: reduced ? 0 : 2.25 }}
      >
        <span />
      </motion.div>
    </section>
  );
}

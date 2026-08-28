import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SceneDetails() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, margin: '-18% 0px' });

  return (
    <section ref={ref} className="why" aria-labelledby="why-title">
      <motion.div
        className="why__inner"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48, filter: 'blur(10px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: reduced ? 0.3 : 1.1, ease: EASE }}
      >
        <h2 id="why-title">Why should I actually use Vast?</h2>
        <p className="why__intro">
          Your browser should support the way you think without competing for your attention.
          Vast keeps tabs, research, notes and sessions in one calm, private workspace, so the
          context you&apos;ve built stays with you and getting back into your work feels natural.
        </p>

        <button
          className={`why__continuation${open ? ' is-open' : ''}`}
          type="button"
          aria-expanded={open}
          aria-controls="why-answer"
          onClick={() => setOpen((value) => !value)}
        >
          <span id="why-answer" className="why__continuation-copy">
            <span>
              Everything important stays on your device and remains easy to restore.
              Vast collects no browsing telemetry, and optional services are described
              separately, so you&apos;re never left guessing what happens to your data.
            </span>
            <span>
              Come back whenever you like; sessions are waiting exactly where you left them, while
              inactive tabs are managed carefully to keep memory use predictable. Notes and research
              stay tied to the browsing context that shaped them, instead of getting scattered
              across tools that don&apos;t talk to each other.
            </span>
            <span>
              The result is a browser that feels calm even when the work gets heavy. You get one
              clear place to explore, organize and return to your ideas, without the interface
              adding to the noise.
            </span>
          </span>
          <span className="why__continuation-action">
            {open ? 'Show less' : 'Continue Reading'}
          </span>
        </button>
      </motion.div>
    </section>
  );
}

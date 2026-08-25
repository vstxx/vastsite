import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
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
          Vast brings tabs, research, notes and sessions into one focused, private workspace,
          so your context stays close and moving between tasks feels natural.
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
              Everything important stays on your device and remains easy to restore. Vast keeps
              your work private. Vast collects no browsing telemetry. Optional services are described separately.
            </span>
            <span>
              Sessions can be revisited when you need them, while inactive tabs are managed carefully
              to keep memory use predictable. Notes and research remain connected to the browsing
              context that created them, instead of becoming scattered across separate tools.
            </span>
            <span>
              The result is a browser that feels calm even when the work becomes complex. Vast gives
              you a clear place to explore, organize and return to ideas without turning the interface
              into another source of distraction.
            </span>
          </span>
          <span className="why__continuation-action">
            {open ? 'Show less' : 'Continue reading'}
            <span className={`why__icon${open ? ' is-open' : ''}`} aria-hidden="true">
              <Plus strokeWidth={1.5} />
            </span>
          </span>
        </button>
      </motion.div>
    </section>
  );
}

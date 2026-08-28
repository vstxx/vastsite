import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useRef } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SceneStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, margin: '-22% 0px' });

  const lineHidden = reduced ? { opacity: 0 } : { opacity: 0, y: 30, filter: 'blur(12px)' };
  const lineVisible = reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <section ref={ref} className="statement" aria-labelledby="statement-title">
      <div className="statement__inner">
        <h2 id="statement-title" className="statement__title">
          <span className="statement__line">
            <motion.span
              className="statement__line-inner"
              initial={lineHidden}
              animate={inView ? lineVisible : {}}
              transition={{ duration: reduced ? 0.3 : 1.1, ease: EASE }}
            >
              World-class customisability
            </motion.span>
          </span>
          <span className="statement__line">
            <motion.span
              className="statement__line-inner"
              initial={lineHidden}
              animate={inView ? lineVisible : {}}
              transition={{ duration: reduced ? 0.3 : 1.1, ease: EASE, delay: reduced ? 0 : 0.14 }}
            >
              and exceptional privacy
            </motion.span>
          </span>
        </h2>

        <motion.div
          className="statement__actions"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduced ? 0.3 : 0.9, ease: EASE, delay: reduced ? 0 : 0.32 }}
        >
          <a className="button button--primary" href="/releases">
            <Download aria-hidden="true" />
            Download
          </a>
          <a className="button button--secondary" href="#film">
            <ArrowDown aria-hidden="true" />
            Explore
          </a>
        </motion.div>
      </div>
    </section>
  );
}

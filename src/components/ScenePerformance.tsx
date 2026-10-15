import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { EASE } from './motion';

const VAST_SCORE = 35.02;
const CHROME_SCORE = 33.32;

const bars = [
  { name: 'Vast Browser', score: VAST_SCORE, vast: true },
  { name: 'Google Chrome', score: CHROME_SCORE, vast: false },
];

export default function ScenePerformance() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, margin: '-18% 0px' });

  const rise = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: inView ? { opacity: 1, y: 0 } : {},
  };
  const duration = reduced ? 0.3 : 1.1;
  const lag = reduced ? 0 : 0.12;

  return (
    <section id="performance" ref={ref} className="perf" aria-labelledby="perf-title">
      <div className="perf__inner">
        <div className="perf__row">
          <motion.h2 id="perf-title" className="perf__lead" {...rise} transition={{ duration, ease: EASE }}>
            <span className="perf__number">35.02</span>
            <span className="perf__caption">on Speedometer 3.1</span>
          </motion.h2>

          <motion.div className="perf__detail" {...rise} transition={{ duration, ease: EASE, delay: lag }}>
            <p>Vast scored 5.1% higher than Google Chrome in our five-run Speedometer 3.1 benchmark.</p>
            <ul className="perf__bars" aria-label="Average Speedometer 3.1 score, higher is better">
              {bars.map((bar, index) => (
                <li key={bar.name} className={bar.vast ? 'is-vast' : undefined}>
                  <span className="perf__bar-name">{bar.name}</span>
                  <span className="perf__bar-score">{bar.score.toFixed(2)}</span>
                  <span className="perf__bar-track" aria-hidden="true">
                    <motion.span
                      className="perf__bar-fill"
                      style={{ width: `${(bar.score / VAST_SCORE) * 100}%` }}
                      initial={{ scaleX: reduced ? 1 : 0 }}
                      animate={{ scaleX: inView || reduced ? 1 : 0 }}
                      transition={{ duration: 1.6, ease: EASE, delay: 0.35 + index * 0.12 }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="perf__row">
          <motion.h3 className="perf__lead perf__lead--text" {...rise} transition={{ duration, ease: EASE }}>
            At least 15% less RAM usage <span>than Chrome</span>
          </motion.h3>

          <motion.div className="perf__detail" {...rise} transition={{ duration, ease: EASE, delay: lag }}>
            <p>In our tests, Vast used at least 15% less RAM than Google Chrome.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

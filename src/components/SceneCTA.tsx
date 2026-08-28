import { BookOpen, Download, GitFork } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import SiteFooter from './SiteFooter';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const GITHUB_URL = 'https://github.com/vstxx/vast-public';
const DOCUMENTATION_URL = 'https://docs.vastbrowser.com';

export default function SceneCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section ref={ref} className="download" aria-labelledby="download-title">
      <motion.div
        className="download__card"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 42, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: reduced ? 0.3 : 1, ease: EASE }}
      >
        <div className="download__copy">
          <h2 id="download-title">Download Vast</h2>
        </div>

        <div className="download__actions">
          <a className="button button--primary" href="/releases">
            <Download aria-hidden="true" />
            Releases
          </a>
          <a className="button button--secondary" href={GITHUB_URL} target="_blank" rel="noreferrer">
            <GitFork aria-hidden="true" />
            GitHub
          </a>
          <a className="button button--secondary" href={DOCUMENTATION_URL} target="_blank" rel="noreferrer">
            <BookOpen aria-hidden="true" />
            Documentation
          </a>
        </div>
      </motion.div>

      <SiteFooter />
    </section>
  );
}

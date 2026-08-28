import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function SceneVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0.965, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.62], reduced ? [1, 1] : [0.2, 1]);

  return (
    <section ref={sectionRef} id="film" className="film-section" aria-label="Vast animation">
      <motion.div className="film" style={{ scale, opacity }}>
        <div className="film__fallback" aria-hidden="true">
          <span>coming soon</span>
        </div>
        <video
          className={`film__video${videoReady ? ' is-ready' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Vast brand animation"
          onCanPlay={() => setVideoReady(true)}
        >
          <source src="/videos/vast-animation.webm" type="video/webm" />
          <source src="/videos/vast-animation.mp4" type="video/mp4" />
        </video>
        <div className="film__edge" aria-hidden="true" />
      </motion.div>
    </section>
  );
}

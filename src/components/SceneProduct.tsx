import { useRef } from 'react';
import { motion } from 'framer-motion';
import FeatureShowcase from './FeatureShowcase';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SceneProduct() {
  const ref = useRef<HTMLElement>(null);
  const active = true;

  return (
    <section
      data-scene="2"
      id="scene-3"
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050507',
        padding: 'clamp(170px, 20vw, 290px) clamp(20px, 4vw, 60px) clamp(170px, 20vw, 290px)',
      }}
    >
      {/* Deep ambient well — builds before the product rises */}
      <motion.div
        aria-hidden
        initial={false}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 2.8, ease: 'easeOut', delay: 0.1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 85% 65% at 50% 80%, rgba(58,34,132,0.15) 0%, rgba(28,15,70,0.08) 40%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      {/* Faint horizontal rim light at mid-viewport */}
      <motion.div
        aria-hidden
        initial={false}
        animate={active ? { opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: 'easeOut', delay: 0.8 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(154,126,220,0.055) 30%, rgba(154,126,220,0.055) 70%, transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Product — emerging from darkness */}
      <motion.div
        initial={false}
        animate={active ? { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 } : {}}
        transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1500px',
        }}
      >
        {/* Glow plane beneath the browser */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '75%',
            height: '200px',
            background:
              'radial-gradient(ellipse, rgba(72,44,145,0.18) 0%, transparent 65%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        <FeatureShowcase />
      </motion.div>

      {/* Bottom darkness — swallows lower edge of browser */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, #050507 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />
    </section>
  );
}

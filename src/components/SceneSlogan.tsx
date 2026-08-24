import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function LineReveal({
  children,
  delay,
  finalSpacing,
  inView,
  reduced,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  finalSpacing: string;
  inView: boolean;
  reduced: boolean;
  style?: React.CSSProperties;
}) {
  const hidden = reduced
    ? { opacity: 0 }
    : { opacity: 0, y: '42%', scale: 0.9, filter: 'blur(18px)', letterSpacing: '0.015em' };
  const visible = reduced
    ? { opacity: 1 }
    : { opacity: 1, y: '0%', scale: 1, filter: 'blur(0px)', letterSpacing: finalSpacing };

  return (
    <span
      className="cinematic-headline__line"
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'center',
        overflow: 'visible',
        ...style,
      }}
    >
      <motion.span
        className="cinematic-headline__line-inner"
        initial={hidden}
        animate={inView ? visible : hidden}
        transition={{ duration: reduced ? 0.35 : 1.35, ease: EASE, delay: reduced ? 0 : delay }}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          transformOrigin: '50% 70%',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function SceneSlogan() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-18% 0px' });
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      data-scene="1"
      id="scene-2"
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100svh',
        background: '#050507',
        padding: 'clamp(210px, 24vw, 360px) clamp(24px, 7vw, 100px)',
        textAlign: 'center',
      }}
    >
      <motion.div
        aria-hidden
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.72 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: reduced ? 0.35 : 1.8, ease: EASE }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 76% 58% at 50% 50%, rgba(68,12,160,0.2) 0%, rgba(38,4,95,0.09) 42%, transparent 72%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 'min(1120px, 92vw)',
          width: '100%',
        }}
      >
        <h1
          aria-label="The Absolute Falcon of Browsers"
          className="cinematic-headline cinematic-headline--falcon"
          style={{
            display: 'grid',
            justifyItems: 'center',
            width: '100%',
            margin: 0,
            fontFamily: "'InterDisplay', system-ui, sans-serif",
            fontWeight: 600,
            lineHeight: 0.84,
            textTransform: 'uppercase',
            color: 'rgba(238,232,248,0.96)',
          }}
        >
          <LineReveal
            delay={0.04}
            finalSpacing="0.19em"
            inView={inView}
            reduced={reduced}
            style={{ marginBottom: 'clamp(18px, 2.2vw, 30px)' }}
          >
            <span
              className="cinematic-headline__lead"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                fontSize: 'clamp(14px, 1.65vw, 21px)',
                whiteSpace: 'nowrap',
              }}
            >
              THE ABSOLUTE
            </span>
          </LineReveal>
          <LineReveal delay={0.14} finalSpacing="-0.07em" inView={inView} reduced={reduced}>
            <span
              className="cinematic-headline__primary"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                fontFamily: "'Bodoni Z37', 'Bodoni 72', Didot, serif",
                fontWeight: 700,
                fontSize: 'clamp(64px, 17vw, 190px)',
                whiteSpace: 'nowrap',
              }}
            >
              FALCON
            </span>
          </LineReveal>
          <LineReveal
            delay={0.3}
            finalSpacing="-0.045em"
            inView={inView}
            reduced={reduced}
            style={{ marginTop: 'clamp(16px, 2.2vw, 30px)' }}
          >
            <span
              className="cinematic-headline__secondary"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                fontSize: 'clamp(27px, 6.7vw, 74px)',
                whiteSpace: 'nowrap',
              }}
            >
              OF BROWSERS
            </span>
          </LineReveal>
        </h1>
      </div>
    </section>
  );
}

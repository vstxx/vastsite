import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CinematicControls() {
  return (
    <motion.a
      href="#top"
      aria-label="Back to start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      whileHover={{ opacity: 0.9 }}
      transition={{ delay: 3.5, duration: 1.4, ease: EASE }}
      style={{
        position: 'fixed',
        top: '22px',
        left: '24px',
        zIndex: 200,
        lineHeight: 0,
      }}
    >
      <img
        src="/logos/v-v.png"
        alt="Vast"
        style={{ height: '17px', width: 'auto', objectFit: 'contain', display: 'block' }}
      />
    </motion.a>
  );
}

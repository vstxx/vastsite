import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './motion';

const points = [
  {
    title: 'Extensions',
    text: 'Vast has its own Extension Hub for the tools you already rely on, like Bitwarden and Proton Pass. Want an ad blocker? It’s there when you ask for it, not forced on you.',
  },
  {
    title: 'A sidebar that’s useful',
    text: 'Bookmarks, notes and your download history live in a sidebar that’s always one click away, so you’re not digging through menus to find your own stuff.',
  },
  {
    title: 'Quick, and easy on memory',
    text: 'Tabs you aren’t using get unloaded until you need them, so your RAM goes to what you’re actually doing. The numbers are right above.',
  },
  {
    title: 'Settings that go deep',
    text: 'Change the corner radius, pick a theme, rework the address bar, fine-tune privacy controls. There’s a lot to tweak, and you never have to touch any of it.',
  },
];

export default function SceneDetails() {
  const reduced = useReducedMotion() ?? false;

  const reveal = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-12% 0px' },
  };

  return (
    <section className="why" aria-labelledby="why-title">
      <div className="why__inner">
        <h2 id="why-title" className="sr-only">What makes Vast yours</h2>

        <div className="why__list">
          {points.map((point) => (
            <motion.div
              className="why__row"
              key={point.title}
              {...reveal}
              transition={{ duration: reduced ? 0.3 : 1.1, ease: EASE }}
            >
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

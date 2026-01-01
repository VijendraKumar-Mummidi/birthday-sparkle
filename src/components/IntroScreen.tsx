import { motion } from 'framer-motion';

interface IntroScreenProps {
  onStart: () => void;
}

const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
      onClick={onStart}
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, hsl(320, 100%, 50%), hsl(260, 100%, 50%))'
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-center"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-4xl font-bold text-foreground"
        >
          Tap to Begin
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-5xl mt-4"
        >
          🎶
        </motion.div>
      </motion.div>

      {/* Floating emojis */}
      {['🎂', '🎁', '🎈', '⭐', '💖', '🌟', '✨'].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500),
            y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50
          }}
          animate={{
            y: -100,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 500),
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default IntroScreen;

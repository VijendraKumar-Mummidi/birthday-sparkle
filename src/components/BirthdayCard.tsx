import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import ImageSlider from './ImageSlider';

const celebrationImages = [
  'sindhu1.jpeg',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=750&fit=crop',
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=750&fit=crop',
];

const BirthdayCard = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
      className="glass-card w-full max-w-lg mx-auto relative z-10"
    >
      <audio
        ref={audioRef}
        autoPlay
        loop
        src="https://cdn.pixabay.com/audio/2022/03/15/audio_7c8b7f8b5d.mp3"
      />

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-2"
        >
          🎂
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">
          Happy Birthday
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-semibold text-primary mt-2 flex items-center justify-center gap-2"
        >
          <span>Amazing Soul</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            💖
          </motion.span>
        </motion.p>
      </motion.div>

      {/* Image Slider - Centered */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <ImageSlider images={celebrationImages} />
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-6"
      >
        <p className="text-lg text-muted-foreground italic">
          ✨ May your life glow brighter every year ✨
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Wishing you endless joy, love, and happiness!
        </p>
      </motion.div>

      {/* Music Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center mt-6"
      >
        <button
          onClick={toggleMusic}
          className="btn-party flex items-center gap-2"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-5 h-5" />
              <span>Pause Music</span>
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5" />
              <span>Play Music</span>
            </>
          )}
          <Music className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Floating decorations */}
      <motion.div
        className="absolute -top-4 -left-4 text-3xl"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🎈
      </motion.div>
      <motion.div
        className="absolute -top-4 -right-4 text-3xl"
        animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        🎁
      </motion.div>
      <motion.div
        className="absolute -bottom-4 -left-4 text-3xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🌟
      </motion.div>
      <motion.div
        className="absolute -bottom-4 -right-4 text-3xl"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        ⭐
      </motion.div>
    </motion.div>
  );
};

export default BirthdayCard;

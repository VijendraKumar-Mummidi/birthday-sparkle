import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setLoaded(false);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [currentIndex, images]);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden glow-box">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Birthday celebration ${currentIndex + 1}`}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            loaded ? 'blur-0' : 'blur-md'
          }`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'bg-primary w-6'
                : 'bg-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

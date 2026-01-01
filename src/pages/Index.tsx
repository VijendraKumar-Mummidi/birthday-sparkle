import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/IntroScreen';
import BirthdayCard from '@/components/BirthdayCard';
import Fireworks from '@/components/Fireworks';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleStart = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fireworks background - always visible after intro */}
      {!showIntro && <Fireworks />}

      {/* Stars background */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>

      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && <IntroScreen onStart={handleStart} />}
      </AnimatePresence>

      {/* Main Content */}
      {!showIntro && (
        <main className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <BirthdayCard />
        </main>
      )}
    </div>
  );
};

export default Index;

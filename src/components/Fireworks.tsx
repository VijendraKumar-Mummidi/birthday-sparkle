import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  exploded: boolean;
  color: string;
}

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const fireworksRef = useRef<Firework[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      '#ff4fd8', '#00ffff', '#ff6b6b', '#ffd93d', '#6bcb77',
      '#4d96ff', '#ff6b9d', '#c44dff', '#ff9f43', '#54e346',
      '#ff5e78', '#00d9ff', '#ffeb3b', '#e040fb', '#00e676'
    ];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      fireworksRef.current.push({
        x,
        y: canvas.height,
        targetY: Math.random() * (canvas.height * 0.5) + 50,
        vy: -(Math.random() * 8 + 10),
        exploded: false,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const particleCount = 100 + Math.floor(Math.random() * 60);
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.2;
        const speed = Math.random() * 8 + 3;
        const life = 80 + Math.random() * 40;
        
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          color: Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1,
          trail: []
        });
      }

      // Add sparkle burst
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 40,
          maxLife: 40,
          color: '#ffffff',
          size: Math.random() * 2 + 0.5,
          trail: []
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 12, 41, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw fireworks
      fireworksRef.current = fireworksRef.current.filter(fw => {
        if (!fw.exploded) {
          fw.y += fw.vy;
          fw.vy += 0.15;

          // Draw trail
          ctx.beginPath();
          ctx.moveTo(fw.x, fw.y);
          ctx.lineTo(fw.x, fw.y + 20);
          const gradient = ctx.createLinearGradient(fw.x, fw.y, fw.x, fw.y + 20);
          gradient.addColorStop(0, fw.color);
          gradient.addColorStop(1, 'transparent');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.stroke();

          // Draw head
          ctx.beginPath();
          ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = fw.color;
          ctx.fill();
          ctx.shadowBlur = 15;
          ctx.shadowColor = fw.color;

          if (fw.y <= fw.targetY) {
            fw.exploded = true;
            explode(fw.x, fw.y, fw.color);
          }
          return true;
        }
        return false;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.pop();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.99;
        p.life--;

        const alpha = p.life / p.maxLife;

        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = p.color + Math.floor(alpha * 60).toString(16).padStart(2, '0');
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        return p.life > 0;
      });

      ctx.shadowBlur = 0;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Launch fireworks at intervals
    const launchInterval = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < count; i++) {
        setTimeout(() => createFirework(), i * 150);
      }
    }, 600);

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createFirework(), i * 100);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(launchInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default Fireworks;

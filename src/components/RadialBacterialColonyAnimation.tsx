import React, { useEffect, useRef } from 'react';

interface RadialBacterialColonyProps {
  className?: string;
  autoPlay?: boolean;
  color?: '#FFD1D1' | '#D1F5FF' | string;
  colorScheme?: 'pink' | 'cyan' | string;
  radiusScale?: number;
}

interface CellParticle {
  x: number;
  y: number;
  radius: number;
  angle: number;
  dist: number;
  hue: number;
  alpha: number;
  growthRate: number;
  pulseOffset: number;
  wobble: number;
}

export const RadialBacterialColonyAnimation: React.FC<RadialBacterialColonyProps> = ({
  className = '',
  autoPlay = true,
  color = '#FFD1D1',
  colorScheme,
  radiusScale = 1.0,
}) => {
  const isCyan = color === '#D1F5FF' || colorScheme === 'cyan' || color?.toLowerCase() === '#d1f5ff';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Animation reference variables
  const animationFrameRef = useRef<number | null>(null);
  const cellsRef = useRef<CellParticle[]>([]);
  const colonyRadiusRef = useRef<number>(6);
  const maxColonyRadiusRef = useRef<number>(110);
  const timeRef = useRef<number>(0);

  // Initialize central inoculum cells
  const resetColony = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    colonyRadiusRef.current = 6 * radiusScale;
    timeRef.current = 0;

    const initialCells: CellParticle[] = [];
    const initialCount = Math.round(42 * Math.max(1, radiusScale));

    for (let i = 0; i < initialCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 0.75) * colonyRadiusRef.current;
      initialCells.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        radius: (1.8 + Math.random() * 2.2) * (radiusScale > 1 ? 1.2 : 1),
        angle,
        dist,
        hue: isCyan ? (190 + Math.random() * 20) : (350 + Math.random() * 20),
        alpha: 0.88 + Math.random() * 0.12,
        growthRate: (0.25 + Math.random() * 0.4) * Math.max(1, radiusScale * 0.9),
        pulseOffset: Math.random() * Math.PI * 2,
        wobble: (Math.random() - 0.5) * 0.4,
      });
    }

    cellsRef.current = initialCells;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI display
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      maxColonyRadiusRef.current = Math.min(rect.width, rect.height) * 0.44 * radiusScale;
      resetColony();
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(() => updateCanvasSize());
    resizeObserver.observe(container);

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Transparent clear - Absolutely no background or container color
      ctx.clearRect(0, 0, width, height);

      timeRef.current += delta;

      // Radial expansion speed (Kr = continuous radial proliferation)
      if (colonyRadiusRef.current < maxColonyRadiusRef.current) {
        colonyRadiusRef.current += delta * 15;
        
        // Spawn active daughter cells continuously along expanding radial boundary
        if (Math.random() < 0.85 && cellsRef.current.length < 520) {
          const spawnAngle = Math.random() * Math.PI * 2;
          const currentR = colonyRadiusRef.current;
          const spawnDist = currentR * (0.65 + Math.random() * 0.38);

          cellsRef.current.push({
            x: centerX + Math.cos(spawnAngle) * spawnDist,
            y: centerY + Math.sin(spawnAngle) * spawnDist,
            radius: 1.4 + Math.random() * 2.1,
            angle: spawnAngle,
            dist: spawnDist,
            hue: isCyan ? (190 + Math.random() * 20) : (350 + Math.random() * 20),
            alpha: 0.85 + Math.random() * 0.15,
            growthRate: 0.2 + Math.random() * 0.35,
            pulseOffset: Math.random() * Math.PI * 2,
            wobble: (Math.random() - 0.5) * 0.3,
          });
        }
      } else {
        // Seamless restart of radial cycle once maximum dish radius is reached
        if (timeRef.current % 14 > 13.2) {
          resetColony();
        }
      }

      const currentR = colonyRadiusRef.current;

      // 1. Outer radial bio-frontier & active wave
      ctx.save();
      const wavePoints = 48;
      ctx.beginPath();
      for (let i = 0; i <= wavePoints; i++) {
        const theta = (i / wavePoints) * Math.PI * 2;
        const wave = Math.sin(theta * 7 + timeRef.current * 2.2) * 2.4 +
                     Math.cos(theta * 11 - timeRef.current * 1.5) * 1.8;
        const r = currentR + wave;
        const px = centerX + Math.cos(theta) * r;
        const py = centerY + Math.sin(theta) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Soft luminous radial halo with color tone
      const radialGrad = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(10, currentR + 4)
      );
      if (isCyan) {
        radialGrad.addColorStop(0, 'rgba(209, 245, 255, 0.70)');
        radialGrad.addColorStop(0.5, 'rgba(180, 235, 255, 0.45)');
        radialGrad.addColorStop(0.88, 'rgba(209, 245, 255, 0.20)');
        radialGrad.addColorStop(1, 'rgba(209, 245, 255, 0.0)');
      } else {
        radialGrad.addColorStop(0, 'rgba(255, 209, 209, 0.65)');
        radialGrad.addColorStop(0.5, 'rgba(255, 185, 185, 0.40)');
        radialGrad.addColorStop(0.88, 'rgba(255, 209, 209, 0.18)');
        radialGrad.addColorStop(1, 'rgba(255, 209, 209, 0.0)');
      }

      ctx.fillStyle = radialGrad;
      ctx.fill();

      // Luminous active frontier stroke
      ctx.strokeStyle = isCyan ? 'rgba(209, 245, 255, 0.95)' : 'rgba(255, 209, 209, 0.95)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = isCyan ? 'rgba(125, 211, 252, 0.9)' : 'rgba(255, 180, 180, 0.9)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // 2. Render individual expanding bacterial cells
      cellsRef.current.forEach((cell) => {
        cell.dist += cell.growthRate * delta * 4.5;
        cell.angle += cell.wobble * delta * 0.5;
        cell.x = centerX + Math.cos(cell.angle) * cell.dist;
        cell.y = centerY + Math.sin(cell.angle) * cell.dist;

        const pulse = 1 + Math.sin(timeRef.current * 4 + cell.pulseOffset) * 0.18;
        const renderR = cell.radius * pulse;

        ctx.save();
        ctx.beginPath();
        // Bacterial rod / coccus morphology
        ctx.ellipse(
          cell.x,
          cell.y,
          renderR * 1.35,
          renderR * 0.85,
          cell.angle,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `hsla(${cell.hue}, 100%, 88%, ${cell.alpha})`;
        ctx.shadowColor = isCyan ? 'rgba(125, 211, 252, 0.85)' : 'rgba(255, 180, 180, 0.85)';
        ctx.shadowBlur = 6;
        ctx.fill();

        // High contrast glowing core
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, renderR * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.restore();
      });

      // 3. Central Inoculum Nucleus
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = isCyan ? '#D1F5FF' : '#FFD1D1';
      ctx.shadowBlur = 14;
      ctx.fill();

      // Central inoculant pulse ripple
      const ringPulse = (timeRef.current * 2) % 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3 + ringPulse * 18, 0, Math.PI * 2);
      ctx.strokeStyle = isCyan 
        ? `rgba(209, 245, 255, ${1 - ringPulse})`
        : `rgba(255, 209, 209, ${1 - ringPulse})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isCyan, radiusScale]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-visible select-none pointer-events-auto cursor-pointer ${className}`}
      onClick={() => resetColony()}
      title="Haz clic para reiniciar el inóculo de la bacteria radial"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};


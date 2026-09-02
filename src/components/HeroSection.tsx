import React, { useEffect, useRef, useState } from 'react';
import { 
  ChevronRight, 
  Cpu,
  Sparkles,
  Activity,
  Microscope,
  ArrowUpRight
} from 'lucide-react';
import gsap from 'gsap';
// import { NeuralNetworkMesh } from './NeuralNetworkMesh';
import plantTissueCultureImg from '../assets/images/plant-tissue-culture.png';


interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const neuralRef = useRef<HTMLDivElement>(null);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 1. GSAP Cinematic Entrance & 3D Interactive Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Initial state
      gsap.set(eyebrowRef.current, { opacity: 0, y: -16, filter: 'blur(6px)' });
      gsap.set(titleWordsRef.current.filter(Boolean), { 
        opacity: 0, 
        y: 40, 
        rotateX: -45, 
        transformOrigin: '50% 100% -20px' 
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 20, filter: 'blur(4px)' });
      gsap.set(neuralRef.current, { opacity: 0, scale: 0.9, y: 20 });

      // Staggered cinematic sequence
      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
      })
      .to(titleWordsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.05,
        duration: 1.1,
        ease: 'elastic.out(1, 0.75)',
      }, '-=0.6')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
      }, '-=0.7')
      .to(neuralRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
      }, '-=0.6');

    }, heroRef);

    // 3D Parallax Tilt with gsap.quickTo
    const heroEl = heroRef.current;
    if (!heroEl) return () => ctx.revert();

    const quickRotateX = gsap.quickTo(headerRef.current, 'rotateX', { duration: 0.8, ease: 'power3.out' });
    const quickRotateY = gsap.quickTo(headerRef.current, 'rotateY', { duration: 0.8, ease: 'power3.out' });
    const quickZ = gsap.quickTo(headerRef.current, 'z', { duration: 0.8, ease: 'power3.out' });

    // Neural mesh slight 3D magnetic reaction
    const neuralEl = neuralRef.current;
    const quickNeuralX = neuralEl ? gsap.quickTo(neuralEl, 'x', { duration: 0.5, ease: 'power2.out' }) : null;
    const quickNeuralY = neuralEl ? gsap.quickTo(neuralEl, 'y', { duration: 0.5, ease: 'power2.out' }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      quickRotateX(-relY * 7);
      quickRotateY(relX * 9);
      quickZ(8);

      if (quickNeuralX && quickNeuralY) {
        quickNeuralX(relX * 12);
        quickNeuralY(relY * 8);
      }
    };

    const handleMouseLeave = () => {
      quickRotateX(0);
      quickRotateY(0);
      quickZ(0);
      if (quickNeuralX && quickNeuralY) {
        quickNeuralX(0);
        quickNeuralY(0);
      }
    };

    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
      ctx.revert();
    };
  }, []);

  // 2. Multi-Depth Fermentation Bacteria Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    interface Bacterium {
      x: number;
      y: number;
      zLayer: number; // 0: Deep background (blurred), 1: Midground (crisp), 2: Foreground (floating macro)
      length: number;
      width: number;
      angle: number;
      angularSpeed: number;
      color: string;
      innerColor: string;
      vx: number;
      vy: number;
      type: 'lactobacillus' | 'bacillus' | 'streptococcus' | 'bifidobacterium' | 'spirulina_helix';
      pulse: number;
      flagellaPhase: number;
      flagellaCount: number;
      isDividing: boolean;
      opacity: number;
    }

    const bacteriaTypes: {
      type: 'lactobacillus' | 'bacillus' | 'streptococcus' | 'bifidobacterium' | 'spirulina_helix';
      color: string;
      innerColor: string;
    }[] = [
      { type: 'lactobacillus', color: 'rgba(16, 185, 129, 0.45)', innerColor: 'rgba(167, 243, 208, 0.75)' },
      { type: 'bacillus', color: 'rgba(14, 165, 233, 0.45)', innerColor: 'rgba(186, 230, 253, 0.75)' },
      { type: 'streptococcus', color: 'rgba(244, 63, 94, 0.40)', innerColor: 'rgba(254, 205, 211, 0.75)' },
      { type: 'bifidobacterium', color: 'rgba(139, 92, 246, 0.45)', innerColor: 'rgba(221, 214, 254, 0.75)' },
      { type: 'spirulina_helix', color: 'rgba(6, 182, 212, 0.50)', innerColor: 'rgba(165, 243, 252, 0.80)' },
    ];

    const bacteriaList: Bacterium[] = [];
    const bacteriaCount = 32;

    for (let i = 0; i < bacteriaCount; i++) {
      const template = bacteriaTypes[i % bacteriaTypes.length];
      const zLayer = i % 4 === 0 ? 0 : i % 5 === 0 ? 2 : 1;
      const scale = zLayer === 0 ? 0.65 : zLayer === 2 ? 1.3 : 1;

      const baseLen = (template.type === 'spirulina_helix' ? 28 : template.type === 'lactobacillus' ? 22 : template.type === 'streptococcus' ? 12 : 18) * scale;
      const baseWid = (template.type === 'spirulina_helix' ? 6 : template.type === 'streptococcus' ? 10 : 8) * scale;

      const driftSpeed = (0.10 + Math.random() * 0.12) * (zLayer === 0 ? 0.6 : zLayer === 2 ? 1.4 : 1);
      const driftAngle = Math.random() * Math.PI * 2;

      bacteriaList.push({
        x: Math.random() * width,
        y: Math.random() * height,
        zLayer,
        length: baseLen + Math.random() * 4,
        width: baseWid + Math.random() * 2,
        angle: driftAngle,
        angularSpeed: (Math.random() - 0.5) * 0.003,
        color: template.color,
        innerColor: template.innerColor,
        vx: Math.cos(driftAngle) * driftSpeed,
        vy: Math.sin(driftAngle) * driftSpeed,
        type: template.type,
        pulse: Math.random() * Math.PI * 2,
        flagellaPhase: Math.random() * Math.PI * 2,
        flagellaCount: template.type === 'bacillus' || template.type === 'bifidobacterium' ? 2 : 1,
        isDividing: i % 6 === 0,
        opacity: zLayer === 0 ? 0.28 : zLayer === 2 ? 0.65 : 0.48,
      });
    }

    // Helper: Draw Capsule/Rod-shaped Bacterium
    const drawCapsuleBacterium = (
      bX: number,
      bY: number,
      len: number,
      wid: number,
      angle: number,
      color: string,
      innerColor: string,
      isDividing: boolean,
      flagellaPhase: number,
      flagellaCount: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(bX, bY);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      const halfLen = len / 2;
      const radius = wid / 2;

      // Flagella motility tail
      for (let f = 0; f < flagellaCount; f++) {
        ctx.beginPath();
        const startX = -halfLen;
        const startY = (f - (flagellaCount - 1) / 2) * 2.5;
        ctx.moveTo(startX, startY);
        
        for (let seg = 1; seg <= 4; seg++) {
          const fx = startX - seg * 5;
          const fy = startY + Math.sin(flagellaPhase + seg * 0.8 + f) * 3;
          ctx.lineTo(fx, fy);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Outer Capsule
      ctx.beginPath();
      ctx.arc(halfLen - radius, 0, radius, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(-halfLen + radius, 0, radius, Math.PI / 2, -Math.PI / 2, false);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Inner Cytoplasm
      ctx.beginPath();
      const innerHalfLen = halfLen * 0.65;
      const innerRadius = radius * 0.55;
      ctx.arc(innerHalfLen - innerRadius, 0, innerRadius, -Math.PI / 2, Math.PI / 2, false);
      ctx.arc(-innerHalfLen + innerRadius, 0, innerRadius, Math.PI / 2, -Math.PI / 2, false);
      ctx.closePath();
      ctx.fillStyle = innerColor;
      ctx.fill();

      // Septum if dividing
      if (isDividing) {
        ctx.beginPath();
        ctx.moveTo(0, -radius);
        ctx.lineTo(0, radius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.restore();
    };

    // Helper: Draw Streptococcus chain
    const drawStreptococcus = (
      bX: number,
      bY: number,
      angle: number,
      color: string,
      innerColor: string,
      pulse: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(bX, bY);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      const cocciCount = 4;
      const coccusRadius = 4 + Math.sin(pulse) * 0.3;

      for (let c = 0; c < cocciCount; c++) {
        const cx = (c - (cocciCount - 1) / 2) * (coccusRadius * 1.6);
        const cy = Math.sin(c * 0.7 + pulse) * 1.5;

        ctx.beginPath();
        ctx.arc(cx, cy, coccusRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, coccusRadius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = innerColor;
        ctx.fill();
      }

      ctx.restore();
    };

    // Helper: Draw Spirulina Microalga / Cyanobacteria
    const drawSpirulinaHelix = (
      bX: number,
      bY: number,
      len: number,
      angle: number,
      color: string,
      innerColor: string,
      pulse: number,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(bX, bY);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      const segments = 20;
      const step = len / segments;
      const startX = -len / 2;

      for (let s = 0; s <= segments; s++) {
        const sx = startX + s * step;
        const sy = Math.sin(s * 0.65 + pulse) * 5;
        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.strokeStyle = innerColor;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.restore();
    };

    // Helper: Draw Bifidobacterium
    const drawBifidobacterium = (
      bX: number,
      bY: number,
      len: number,
      angle: number,
      color: string,
      innerColor: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(bX, bY);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;

      const r = 3.8;
      const half = len / 2;

      ctx.strokeStyle = color;
      ctx.lineWidth = r * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(-half, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(half * 0.85, -half * 0.55);
      ctx.moveTo(0, 0);
      ctx.lineTo(half * 0.85, half * 0.55);
      ctx.stroke();

      ctx.strokeStyle = innerColor;
      ctx.lineWidth = r;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Bacteria Colony slowly drifting across background
      bacteriaList.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.angle += b.angularSpeed;
        b.pulse += 0.012;
        b.flagellaPhase += 0.04;

        // Screen Boundary wrap
        if (b.x < -50) b.x = width + 50;
        if (b.x > width + 50) b.x = -50;
        if (b.y < -50) b.y = height + 50;
        if (b.y > height + 50) b.y = -50;

        // Render based on bacterial morphology
        if (b.type === 'streptococcus') {
          drawStreptococcus(b.x, b.y, b.angle, b.color, b.innerColor, b.pulse, b.opacity);
        } else if (b.type === 'spirulina_helix') {
          drawSpirulinaHelix(b.x, b.y, b.length, b.angle, b.color, b.innerColor, b.pulse, b.opacity);
        } else if (b.type === 'bifidobacterium') {
          drawBifidobacterium(b.x, b.y, b.length, b.angle, b.color, b.innerColor, b.opacity);
        } else {
          drawCapsuleBacterium(
            b.x,
            b.y,
            b.length,
            b.width,
            b.angle,
            b.color,
            b.innerColor,
            b.isDividing,
            b.flagellaPhase,
            b.flagellaCount,
            b.opacity
          );
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const headlineLines = [
    ["EL", "FUTURO", "DE", "LA"],
    ["ALIMENTACIÓN", "SE", "DISEÑA"],
    ["DESDE", "LA", "CIENCIA"]
  ];

  let wordIndexCounter = 0;

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-24 overflow-hidden bg-[#F1F5F9] text-[#0F172A]"
      style={{ perspective: '1200px' }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85" />
      <div className="absolute inset-0 lab-grid-bg opacity-25 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Bento Header with 3D Parallax & GSAP Entrance */}
        <header 
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 items-center pt-3 gap-6 lg:gap-8 xl:gap-10 transition-transform duration-100 ease-out will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Left Column: UI/UX refined 3-line balanced headline & subtitle with generous breathing room */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-3.5 pr-0 lg:pr-2">
            <span 
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 text-xs sm:text-[13px] uppercase tracking-[0.25em] font-bold text-[#64748B] bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-slate-200/70 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              BLOG CIENTÍFICO
            </span>
            
            <h1 className="text-[1.65rem] xs:text-[1.85rem] sm:text-3xl md:text-[2.15rem] lg:text-[2.25rem] xl:text-[2.65rem] font-extrabold tracking-tight text-[#0F172A] font-display leading-[1.14] pt-0.5 select-none">
              {headlineLines.map((lineWords, lineIdx) => (
                <span key={lineIdx} className="block whitespace-nowrap">
                  {lineWords.map((word, wIdx) => {
                    const idx = lineIdx === 0 ? wIdx : lineIdx === 1 ? 4 + wIdx : 7 + wIdx;
                    const isCiencia = word.toLowerCase().includes('ciencia');
                    const isAlimentacion = word.toLowerCase().includes('alimentación');

                    return (
                      <span
                        key={idx}
                        ref={(el) => { titleWordsRef.current[idx] = el; }}
                        className={`inline-block mr-2 sm:mr-2.5 xl:mr-3 will-change-transform ${
                          isCiencia 
                            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent' 
                            : isAlimentacion 
                            ? 'text-slate-900 drop-shadow-2xs' 
                            : 'text-[#0F172A]'
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p 
              ref={subtitleRef}
              className="text-[#475569] text-xs sm:text-sm lg:text-[15px] font-medium leading-relaxed pt-0.5 flex items-start sm:items-center gap-2.5 max-w-xl"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block flex-shrink-0 mt-1 sm:mt-0 shadow-xs shadow-cyan-400/50" />
              <span>DE LA FERMENTACIÓN MILENARIA A LA INGENIERÍA DE PRECISIÓN EN BIORREACTORES</span>
            </p>
          </div>
          
          {/* Right Column: Plant tissue culture image */}
          <div ref={neuralRef} className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end w-full overflow-visible">
            {/* <NeuralNetworkMesh className="w-full h-[230px] sm:h-[260px] lg:h-[290px] xl:h-[320px]" /> */}
            <img
              src={plantTissueCultureImg}
              alt="Cultivos de plantas con raíces en tubos de ensayo sobre una gradilla de laboratorio"
              className="w-full h-[230px] sm:h-[260px] lg:h-[290px] xl:h-[320px] object-contain"
            />
          </div>
        </header>

      </div>
    </section>
  );
};

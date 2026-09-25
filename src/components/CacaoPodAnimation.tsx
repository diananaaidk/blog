import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CacaoPodAnimationProps {
  className?: string;
  autoLoop?: boolean;
}

export const CacaoPodAnimation: React.FC<CacaoPodAnimationProps> = ({
  className = '',
  autoLoop = true,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle opening and closing if enabled and not hovered
  useEffect(() => {
    if (!autoLoop || isHovered) return;
    const interval = setInterval(() => {
      setIsOpen((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoLoop, isHovered]);

  // Seed positions arranged naturally in a column around the placenta
  const seeds = [
    // Top tier
    { cx: 190, cy: 155, rx: 14, ry: 9, rotate: -25, delay: 0.05 },
    { cx: 210, cy: 155, rx: 14, ry: 9, rotate: 25, delay: 0.08 },
    // Upper-mid tier
    { cx: 178, cy: 180, rx: 16, ry: 10, rotate: -35, delay: 0.1 },
    { cx: 200, cy: 176, rx: 15, ry: 10, rotate: 0, delay: 0.12 },
    { cx: 222, cy: 180, rx: 16, ry: 10, rotate: 35, delay: 0.14 },
    // Mid tier (widest)
    { cx: 172, cy: 208, rx: 17, ry: 11, rotate: -40, delay: 0.16 },
    { cx: 194, cy: 205, rx: 16, ry: 11, rotate: -10, delay: 0.18 },
    { cx: 208, cy: 206, rx: 16, ry: 11, rotate: 10, delay: 0.2 },
    { cx: 228, cy: 208, rx: 17, ry: 11, rotate: 40, delay: 0.22 },
    // Lower-mid tier
    { cx: 176, cy: 236, rx: 16, ry: 10, rotate: -30, delay: 0.24 },
    { cx: 200, cy: 234, rx: 16, ry: 10, rotate: 0, delay: 0.26 },
    { cx: 224, cy: 236, rx: 16, ry: 10, rotate: 30, delay: 0.28 },
    // Lower tier
    { cx: 184, cy: 262, rx: 15, ry: 9, rotate: -20, delay: 0.3 },
    { cx: 206, cy: 262, rx: 15, ry: 9, rotate: 20, delay: 0.32 },
    // Bottom tip
    { cx: 195, cy: 285, rx: 13, ry: 8, rotate: -5, delay: 0.35 },
    { cx: 205, cy: 286, rx: 13, ry: 8, rotate: 5, delay: 0.38 },
  ];

  // Floating aroma / bio-active particles
  const particles = [
    { id: 1, x: 160, y: 150, delay: 0.1, size: 4 },
    { id: 2, x: 240, y: 160, delay: 0.4, size: 5 },
    { id: 3, x: 150, y: 220, delay: 0.2, size: 3 },
    { id: 4, x: 250, y: 230, delay: 0.5, size: 4 },
    { id: 5, x: 170, y: 280, delay: 0.3, size: 3.5 },
    { id: 6, x: 230, y: 275, delay: 0.6, size: 4.5 },
  ];

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
      onClick={() => setIsOpen((prev) => !prev)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Mazorca de cacao biotecnológica: haz clic para abrir o cerrar"
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-h-[300px] sm:max-h-[340px] drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* Cacao Pod Outer Gradients */}
          <linearGradient id="cacaoLeftShell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" /> {/* Amber 600 */}
            <stop offset="35%" stopColor="#b45309" /> {/* Amber 700 */}
            <stop offset="70%" stopColor="#9a3412" /> {/* Orange 800 */}
            <stop offset="100%" stopColor="#78350f" /> {/* Amber 900 */}
          </linearGradient>

          <linearGradient id="cacaoRightShell" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" /> {/* Amber 500 */}
            <stop offset="40%" stopColor="#c2410c" /> {/* Orange 700 */}
            <stop offset="75%" stopColor="#9a3412" /> {/* Orange 800 */}
            <stop offset="100%" stopColor="#451a03" /> {/* Amber 950 */}
          </linearGradient>

          {/* Inner White Spongy Rind (Mesocarpio) */}
          <linearGradient id="innerRindGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>

          {/* Seed Mucilage Glossy Gradient (Pulpa blanca dulce) */}
          <radialGradient id="seedMucilageGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f8fafc" />
            <stop offset="75%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>

          {/* Seed Inner Cocoa Bean Tone */}
          <linearGradient id="seedCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#581c87" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b0764" stopOpacity="0.7" />
          </linearGradient>

          {/* Wood Stem Gradient */}
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#573418" />
            <stop offset="50%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#422006" />
          </linearGradient>

          {/* Glow filter for seeds / aroma */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Cacao Peduncle / Stem (Tallo Superior) */}
        <path
          d="M 194,70 Q 192,95 195,110 L 205,110 Q 208,95 204,70 Z"
          fill="url(#stemGrad)"
          stroke="#291305"
          strokeWidth="1.5"
        />
        <ellipse cx="199" cy="70" rx="6" ry="2.5" fill="#a16207" />

        {/* ========================================================= */}
        {/* INTERIOR: Central Placenta and Mucilage-Covered Seeds     */}
        {/* ========================================================= */}
        <motion.g
          initial={false}
          animate={{
            scale: isOpen ? 1 : 0.88,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '200px 215px' }}
        >
          {/* Inner Back Cavity Shadow */}
          <path
            d="M 200,115 C 160,118 145,170 145,215 C 145,265 170,305 200,325 C 230,305 255,265 255,215 C 255,170 240,118 200,115 Z"
            fill="#381504"
            opacity="0.85"
          />

          {/* Central White Placenta Sponge */}
          <path
            d="M 200,130 C 185,150 180,210 184,280 C 192,295 200,305 200,305 C 200,305 208,295 216,280 C 220,210 215,150 200,130 Z"
            fill="url(#innerRindGrad)"
            opacity="0.92"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
          />

          {/* Seeds Grid (Granos de Cacao recubiertos con dulce pulpa blanca) */}
          {seeds.map((seed, idx) => (
            <motion.g
              key={idx}
              initial={false}
              animate={{
                scale: isOpen ? 1 : 0.4,
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 15,
              }}
              transition={{
                duration: 0.6,
                delay: isOpen ? seed.delay : 0,
                ease: 'easeOut',
              }}
              style={{
                transformOrigin: `${seed.cx}px ${seed.cy}px`,
              }}
            >
              {/* Seed Drop Shadow */}
              <ellipse
                cx={seed.cx}
                cy={seed.cy + 2}
                rx={seed.rx}
                ry={seed.ry}
                transform={`rotate(${seed.rotate}, ${seed.cx}, ${seed.cy})`}
                fill="#1c0a02"
                opacity="0.45"
              />

              {/* Seed Body (Mucilage Gloss) */}
              <ellipse
                cx={seed.cx}
                cy={seed.cy}
                rx={seed.rx}
                ry={seed.ry}
                transform={`rotate(${seed.rotate}, ${seed.cx}, ${seed.cy})`}
                fill="url(#seedMucilageGrad)"
                stroke="#cbd5e1"
                strokeWidth="0.75"
              />

              {/* Translucent Cocoa Bean Core Hint */}
              <ellipse
                cx={seed.cx + 0.5}
                cy={seed.cy + 0.5}
                rx={seed.rx * 0.62}
                ry={seed.ry * 0.62}
                transform={`rotate(${seed.rotate}, ${seed.cx}, ${seed.cy})`}
                fill="url(#seedCoreGrad)"
              />

              {/* Top Specular Wet Highlight */}
              <ellipse
                cx={seed.cx - seed.rx * 0.28}
                cy={seed.cy - seed.ry * 0.3}
                rx={seed.rx * 0.32}
                ry={seed.ry * 0.25}
                transform={`rotate(${seed.rotate}, ${seed.cx}, ${seed.cy})`}
                fill="#ffffff"
                opacity="0.9"
              />
            </motion.g>
          ))}

          {/* Floating Fermentation & Aroma Sparkles */}
          {isOpen &&
            particles.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill="#fde047"
                opacity={0.8}
                filter="url(#softGlow)"
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [0.8, 1.25, 0.8],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
        </motion.g>

        {/* ========================================================= */}
        {/* LEFT SHELL (Mitad Izquierda de la Cáscara del Cacao)      */}
        {/* ========================================================= */}
        <motion.g
          initial={false}
          animate={{
            x: isOpen ? -52 : 0,
            rotate: isOpen ? -18 : 0,
          }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '198px 110px' }}
        >
          {/* Inner Left Rind Layer */}
          {isOpen && (
            <path
              d="M 198,110 C 160,120 135,160 135,215 C 135,270 165,305 198,328 C 180,290 170,240 170,215 C 170,175 182,135 198,110 Z"
              fill="url(#innerRindGrad)"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          )}

          {/* Left Outer Shell Main Body */}
          <path
            d="M 198,110 C 145,120 120,165 120,215 C 120,270 155,308 198,328 C 192,270 190,170 198,110 Z"
            fill="url(#cacaoLeftShell)"
            stroke="#572308"
            strokeWidth="1.8"
          />

          {/* Longitudinal Ridges / Grooves (Costillas del Cacao) */}
          <path
            d="M 198,110 C 158,130 136,170 136,215 C 136,260 162,298 198,328"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.2"
            opacity="0.8"
          />
          <path
            d="M 198,110 C 148,135 128,175 128,215 C 128,265 150,295 198,328"
            fill="none"
            stroke="#78350f"
            strokeWidth="2.8"
            opacity="0.65"
          />
          <path
            d="M 198,110 C 175,130 158,170 158,215 C 158,265 178,300 198,328"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            opacity="0.75"
          />

          {/* Organic Bumps & Surface Texture */}
          <circle cx="140" cy="185" r="2.5" fill="#fde68a" opacity="0.4" />
          <circle cx="132" cy="225" r="3" fill="#fde68a" opacity="0.35" />
          <circle cx="152" cy="265" r="2" fill="#fde68a" opacity="0.4" />
          <circle cx="165" cy="150" r="2" fill="#fde68a" opacity="0.3" />
        </motion.g>

        {/* ========================================================= */}
        {/* RIGHT SHELL (Mitad Derecha de la Cáscara del Cacao)      */}
        {/* ========================================================= */}
        <motion.g
          initial={false}
          animate={{
            x: isOpen ? 52 : 0,
            rotate: isOpen ? 18 : 0,
          }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '202px 110px' }}
        >
          {/* Inner Right Rind Layer */}
          {isOpen && (
            <path
              d="M 202,110 C 240,120 265,160 265,215 C 265,270 235,305 202,328 C 220,290 230,240 230,215 C 230,175 218,135 202,110 Z"
              fill="url(#innerRindGrad)"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          )}

          {/* Right Outer Shell Main Body */}
          <path
            d="M 202,110 C 255,120 280,165 280,215 C 280,270 245,308 202,328 C 208,270 210,170 202,110 Z"
            fill="url(#cacaoRightShell)"
            stroke="#451a03"
            strokeWidth="1.8"
          />

          {/* Longitudinal Ridges / Grooves (Costillas del Cacao) */}
          <path
            d="M 202,110 C 242,130 264,170 264,215 C 264,260 238,298 202,328"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.2"
            opacity="0.8"
          />
          <path
            d="M 202,110 C 252,135 272,175 272,215 C 272,265 250,295 202,328"
            fill="none"
            stroke="#78350f"
            strokeWidth="2.8"
            opacity="0.65"
          />
          <path
            d="M 202,110 C 225,130 242,170 242,215 C 242,265 222,300 202,328"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.5"
            opacity="0.75"
          />

          {/* Organic Bumps & Surface Texture */}
          <circle cx="260" cy="185" r="2.5" fill="#fde68a" opacity="0.4" />
          <circle cx="268" cy="225" r="3" fill="#fde68a" opacity="0.35" />
          <circle cx="248" cy="265" r="2" fill="#fde68a" opacity="0.4" />
          <circle cx="235" cy="150" r="2" fill="#fde68a" opacity="0.3" />
        </motion.g>

        {/* Bottom Tip Connector / Apex */}
        <ellipse cx="200" cy="328" rx="4" ry="2.5" fill="#451a03" />
      </svg>

      {/* Floating State Hint Tag */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? -2 : 0 }}
        className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/10 backdrop-blur-xs border border-amber-800/20 text-amber-900 text-[11px] font-semibold tracking-wide shadow-2xs"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isOpen ? 'bg-amber-500 animate-pulse' : 'bg-amber-700'
          }`}
        />
        <span>{isOpen ? 'Cacao Abierto · Semillas & Mucílago' : 'Toca para abrir mazorca'}</span>
      </motion.div>
    </div>
  );
};

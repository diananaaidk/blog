import React, { useEffect, useRef } from 'react';

interface Particle3D {
  theta: number;
  phi: number;
  r: number;
  size: number;
}

interface InflowParticle {
  startX: number;
  startY: number;
  startZ: number;
  spiralOffset: number;
  speed: number;
  size: number;
  color: string;
}

interface NodeDef {
  id: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  coreColor: string;
  particles: Particle3D[];
  inflowParticles: InflowParticle[];
}

interface EdgeDef {
  from: number;
  to: number;
  triggerTime: number;
  duration: number;
  isMainGenesis?: boolean;
}

export const NeuralNetworkMesh: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.offsetWidth || 620);
    let height = (canvas.height = container.offsetHeight || 280);

    const updateSize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = canvas.width = rect.width || 620;
      height = canvas.height = rect.height || 280;
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Original compact constellation with 15 nodes.
    const rawNodesData = [
      { id: 0, x: -250, y: -25, z: 20, r: 25 },
      { id: 1, x: -195, y: -80, z: -15, r: 23 },
      { id: 2, x: -160, y: 15, z: 40, r: 26 },
      { id: 3, x: -190, y: 78, z: 10, r: 24 },
      { id: 4, x: -115, y: 82, z: -25, r: 24 },
      { id: 5, x: -85, y: -12, z: 45, r: 28 },
      { id: 6, x: -40, y: -82, z: -20, r: 24 },
      { id: 7, x: 25, y: -84, z: 15, r: 23 },
      { id: 8, x: 5, y: 10, z: 55, r: 36 },
      { id: 9, x: 75, y: 82, z: 12, r: 25 },
      { id: 10, x: 130, y: 28, z: -30, r: 26 },
      { id: 11, x: 145, y: -58, z: 32, r: 26 },
      { id: 12, x: 205, y: -78, z: -10, r: 23 },
      { id: 13, x: 215, y: 64, z: 35, r: 25 },
      { id: 14, x: 265, y: -8, z: -15, r: 25 },
    ];
    const nodes: NodeDef[] = rawNodesData.map((data, idx) => {
      // Fixed particles for formed halo
      const particles: Particle3D[] = [];
      for (let p = 0; p < 26; p++) {
        particles.push({
          theta: Math.random() * Math.PI * 2,
          phi: Math.acos(Math.random() * 2 - 1),
          r: data.r * (0.85 + Math.random() * 0.35),
          size: 1.8 + Math.random() * 2.4,
        });
      }

      // Magical subatomic particles flying in during birth
      const inflowParticles: InflowParticle[] = [];
      for (let k = 0; k < 28; k++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 65;
        inflowParticles.push({
          startX: Math.cos(angle) * dist,
          startY: Math.sin(angle) * dist,
          startZ: (Math.random() - 0.5) * 45,
          spiralOffset: Math.random() * Math.PI * 2,
          speed: 0.85 + Math.random() * 0.5,
          size: 2.0 + Math.random() * 2.6,
          color: k % 3 === 0 ? '#F59E0B' : k % 2 === 0 ? '#38BDF8' : '#06B6D4',
        });
      }

      return {
        id: data.id,
        x: data.x,
        y: data.y,
        z: data.z,
        radius: data.r,
        color: idx % 3 === 0 ? '#38BDF8' : '#06B6D4',
        coreColor: idx % 2 === 0 ? '#F59E0B' : '#FBBF24',
        particles,
        inflowParticles,
      };
    });

    // Timeline Configuration
    const NODE_COALESCE_TIME = 0.85;
    const CONNECTION_GROWTH_TIME = 0.6;
    const STEP_INTERVAL = NODE_COALESCE_TIME + CONNECTION_GROWTH_TIME;

    const nodeBirthTimes: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      nodeBirthTimes.push(i * STEP_INTERVAL);
    }

    // Edges (Main genesis pipeline + rich structural cross-connections)
    const edges: EdgeDef[] = [];
    
    // Main genesis links
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({
        from: i,
        to: i + 1,
        triggerTime: nodeBirthTimes[i] + NODE_COALESCE_TIME * 0.8,
        duration: CONNECTION_GROWTH_TIME + NODE_COALESCE_TIME * 0.2,
        isMainGenesis: true,
      });
    }

    // Additional cross-network links forming as nodes come alive
    const crossPairs = [
      [0, 3], [1, 6], [2, 5], [3, 4], [4, 8], [5, 8],
      [6, 7], [6, 8], [7, 11], [8, 9], [8, 10], [9, 13],
      [10, 11], [11, 14], [12, 14], [10, 14],
    ].map(([from, to]) => ({ from, to }));
    crossPairs.forEach((pair) => {
      const laterNode = Math.max(pair.from, pair.to);
      edges.push({
        from: pair.from,
        to: pair.to,
        triggerTime: nodeBirthTimes[laterNode] + NODE_COALESCE_TIME * 0.7,
        duration: 0.8,
        isMainGenesis: false,
      });
    });

    const TOTAL_CYCLE_TIME = nodeBirthTimes[nodes.length - 1] + NODE_COALESCE_TIME + 12;

    const startTime = performance.now();

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const elapsedSeconds = ((now - startTime) / 1000) % TOTAL_CYCLE_TIME;
      const fov = 360;
      const centerX = width / 2;
      const centerY = height / 2;
      const availableWidth = Math.max(220, width - 84);
      const availableHeight = Math.max(150, height - 64);
      const scaleFactor = Math.min(availableWidth / 540, availableHeight / 180, 1.35);
      const rotY = 0;
      const rotX = 0.08;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = nodes.map((node) => {
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;
        const distance = fov / (fov + z2 + 80);
        const projX = centerX + x1 * distance * scaleFactor;
        const projY = centerY + y1 * distance * scaleFactor;
        const projRadius = Math.max(7, node.radius * distance * scaleFactor);

        return {
          node,
          x: projX,
          y: projY,
          z: z2,
          distance,
          radius: projRadius,
          scaleFactor,
          x3D: x1,
          y3D: y1,
          z3D: z2,
        };
      });

      // Map by node ID for instant lookup
      const projMap = new Map<number, typeof projected[0]>();
      projected.forEach((p) => projMap.set(p.node.id, p));

      // -------------------------------------------------------------
      // 1. DRAW EDGES / CONNECTIONS (Laser filaments & Synapses)
      // -------------------------------------------------------------
      edges.forEach((edge) => {
        if (elapsedSeconds < edge.triggerTime) return;

        const progress = Math.min(1, (elapsedSeconds - edge.triggerTime) / edge.duration);
        if (progress <= 0) return;

        const fromProj = projMap.get(edge.from);
        const toProj = projMap.get(edge.to);
        if (!fromProj || !toProj) return;

        const currentTargetX = fromProj.x + (toProj.x - fromProj.x) * progress;
        const currentTargetY = fromProj.y + (toProj.y - fromProj.y) * progress;
        const avgDistance = (fromProj.distance + toProj.distance) / 2;

        // Outer glow halo line
        ctx.beginPath();
        ctx.moveTo(fromProj.x, fromProj.y);
        ctx.lineTo(currentTargetX, currentTargetY);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.45 * avgDistance})`;
        ctx.lineWidth = Math.max(3.8, 8.5 * avgDistance * scaleFactor);
        ctx.stroke();

        // Base glowing cyan/teal axon line
        ctx.beginPath();
        ctx.moveTo(fromProj.x, fromProj.y);
        ctx.lineTo(currentTargetX, currentTargetY);
        ctx.strokeStyle = `rgba(8, 145, 178, ${0.85 * avgDistance})`;
        ctx.lineWidth = Math.max(2.2, 5.0 * avgDistance * scaleFactor);
        ctx.stroke();

        // Inner electric core filament
        ctx.beginPath();
        ctx.moveTo(fromProj.x, fromProj.y);
        ctx.lineTo(currentTargetX, currentTargetY);
        ctx.strokeStyle = `rgba(186, 230, 253, ${0.95 * avgDistance})`;
        ctx.lineWidth = Math.max(1.2, 2.6 * avgDistance * scaleFactor);
        ctx.stroke();

        // Leading tip spark while growing
        if (progress < 1) {
          ctx.beginPath();
          ctx.arc(currentTargetX, currentTargetY, 5.5 * avgDistance * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = '#FDE047';
          ctx.shadowColor = '#06B6D4';
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Spark particles at the growing head
          for (let s = 0; s < 4; s++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = (Math.random() * 8 + 4) * avgDistance * scaleFactor;
            ctx.beginPath();
            ctx.arc(
              currentTargetX + Math.cos(angle) * dist,
              currentTargetY + Math.sin(angle) * dist,
              1.6 * avgDistance,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = '#BAE6FD';
            ctx.fill();
          }
        } else {
          // Connection is fully complete -> Active Synaptic Energy Pulses
          const pulseSpeed = 2.4;
          const pulseOffset = (edge.from * 1.3 + edge.to * 2.1) % (Math.PI * 2);
          const pulsePos = (Math.sin(elapsedSeconds * pulseSpeed + pulseOffset) + 1) / 2;

          const px = fromProj.x + (toProj.x - fromProj.x) * pulsePos;
          const py = fromProj.y + (toProj.y - fromProj.y) * pulsePos;

          ctx.beginPath();
          ctx.arc(px, py, 4.2 * avgDistance * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 158, 11, 0.95)';
          ctx.shadowColor = '#0EA5E9';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // -------------------------------------------------------------
      // 2. DRAW NODES & MAGICAL PARTICLE COALESCENCE
      // -------------------------------------------------------------
      projected.sort((a, b) => b.z - a.z);

      projected.forEach((item) => {
        const { node, x, y, radius, distance, scaleFactor: sFact } = item;
        const birthTime = nodeBirthTimes[node.id];

        // Before birth: node does not exist yet
        if (elapsedSeconds < birthTime) return;

        const age = elapsedSeconds - birthTime;

        // Phase A: Coalescence / Inflow of Subatomic Magical Particles
        if (age < NODE_COALESCE_TIME) {
          const inflowProgress = age / NODE_COALESCE_TIME;
          const easeIn = Math.pow(inflowProgress, 1.8);

          // Swirling subatomic particles converging into node center
          node.inflowParticles.forEach((p) => {
            const currentDist = (1 - easeIn) * (55 + p.size * 12) * distance * sFact;
            const spiralAngle = p.spiralOffset + easeIn * Math.PI * 4 * p.speed;

            const px = x + Math.cos(spiralAngle) * currentDist;
            const py = y + Math.sin(spiralAngle) * currentDist;

            ctx.beginPath();
            ctx.arc(px, py, Math.max(1.2, p.size * (1 - easeIn * 0.3) * distance), 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          });

          // Early forming core glow
          const infantCoreSize = Math.max(2.5, radius * easeIn * 0.85);
          const infantGlow = ctx.createRadialGradient(x, y, 0, x, y, infantCoreSize * 2.6);
          infantGlow.addColorStop(0, '#FFFFFF');
          infantGlow.addColorStop(0.35, node.coreColor);
          infantGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');

          ctx.beginPath();
          ctx.arc(x, y, infantCoreSize * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = infantGlow;
          ctx.fill();

          return;
        }

        // Phase B: Ignition Flash Burst when fully born
        const timeSinceIgnition = age - NODE_COALESCE_TIME;
        if (timeSinceIgnition < 0.45) {
          const flashProgress = timeSinceIgnition / 0.45;
          const flashRadius = radius * (1 + (1 - flashProgress) * 2.5);
          const flashAlpha = (1 - flashProgress) * 0.85;

          const flashGrad = ctx.createRadialGradient(x, y, 0, x, y, flashRadius);
          flashGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`);
          flashGrad.addColorStop(0.3, `rgba(245, 158, 11, ${flashAlpha * 0.85})`);
          flashGrad.addColorStop(0.7, `rgba(6, 182, 212, ${flashAlpha * 0.5})`);
          flashGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

          ctx.beginPath();
          ctx.arc(x, y, flashRadius, 0, Math.PI * 2);
          ctx.fillStyle = flashGrad;
          ctx.fill();
        }

        // Phase C: Fully Materialized Living Neural Node
        const depthAlpha = Math.max(0.35, Math.min(1, (distance - 0.45) * 2));

        // 1. Outer Spherical Particle Halo
        node.particles.forEach((p) => {
          const theta = p.theta;
          const phi = p.phi;

          const px = radius * Math.sin(phi) * Math.cos(theta);
          const py = radius * Math.sin(phi) * Math.sin(theta);
          const pz = radius * Math.cos(phi);

          const dotX = x + px;
          const dotY = y + py;
          const pAlpha = depthAlpha * (0.45 + (pz / radius) * 0.55);

          if (pAlpha > 0.08) {
            ctx.beginPath();
            ctx.arc(dotX, dotY, Math.max(1.2, p.size * distance), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(2, 132, 199, ${pAlpha})`;
            ctx.fill();
          }
        });

        // 2. Cyan Atmospheric Glow
        const glowGrad = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius * 1.5);
        glowGrad.addColorStop(0, `rgba(6, 182, 212, ${0.45 * depthAlpha})`);
        glowGrad.addColorStop(0.55, `rgba(14, 165, 233, ${0.22 * depthAlpha})`);
        glowGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');

        ctx.beginPath();
        ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // 3. Central Golden/Amber Fiery Bioluminescent Core
        const corePulse = 1 + Math.sin(elapsedSeconds * 3.5 + node.id) * 0.15;
        const coreRadius = Math.max(4.8, radius * 0.42 * corePulse);

        const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, coreRadius * 2.2);
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.25, node.coreColor);
        coreGrad.addColorStop(0.7, '#EA580C');
        coreGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

        ctx.shadowColor = node.coreColor;
        ctx.shadowBlur = 14 * distance;

        ctx.beginPath();
        ctx.arc(x, y, coreRadius * 2.0, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // Core White Hotspot
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1.8, coreRadius * 0.45), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-visible bg-transparent pointer-events-none ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block relative z-0"
      />
    </div>
  );
};

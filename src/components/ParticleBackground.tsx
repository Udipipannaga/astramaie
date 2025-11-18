import { motion } from "motion/react";
import { useMemo } from "react";

export function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  const geometricShapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 150 + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {geometricShapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          className="absolute border border-purple-500/10"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            borderRadius: shape.id % 3 === 0 ? "50%" : shape.id % 3 === 1 ? "0%" : "20%",
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {particles.slice(0, 15).map((p1, i) => {
          const p2 = particles[(i + 3) % particles.length];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

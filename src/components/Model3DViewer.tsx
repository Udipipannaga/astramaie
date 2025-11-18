import { motion } from "motion/react";
import { useState } from "react";
import { RotateCw, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export function Model3DViewer() {
  const [rotation, setRotation] = useState({ x: 20, y: 20 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setRotation({
      x: rotation.x + deltaY * 0.5,
      y: rotation.y + deltaX * 0.5,
    });
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <motion.button
          className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          <RotateCw className={`w-5 h-5 ${autoRotate ? "text-blue-400" : "text-white"}`} />
        </motion.button>
        <motion.button
          className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
        >
          <ZoomIn className="w-5 h-5" />
        </motion.button>
        <motion.button
          className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
        >
          <ZoomOut className="w-5 h-5" />
        </motion.button>
        <motion.button
          className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setRotation({ x: 20, y: 20 });
            setZoom(1);
          }}
        >
          <Maximize2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* 3D Model Container */}
      <div
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: "1000px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="relative w-80 h-80"
          style={{
            transformStyle: "preserve-3d",
            scale: zoom,
          }}
          animate={
            autoRotate
              ? {
                  rotateY: [rotation.y, rotation.y + 360],
                }
              : {
                  rotateX: rotation.x,
                  rotateY: rotation.y,
                }
          }
          transition={
            autoRotate
              ? {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }
              : {
                  type: "spring",
                  stiffness: 100,
                }
          }
        >
          {/* AI Brain Core - Central Sphere */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 0 60px rgba(59, 130, 246, 0.5), inset 0 0 30px rgba(168, 85, 247, 0.3)",
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-50 blur-sm" />
          </motion.div>

          {/* Orbital Rings */}
          {[0, 45, 90].map((angle, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 rounded-full"
              style={{
                transformStyle: "preserve-3d",
                borderColor: i === 0 ? "#3b82f6" : i === 1 ? "#a855f7" : "#ec4899",
                opacity: 0.3,
                rotateX: `${angle}deg`,
              }}
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Orbital Nodes */}
              {[0, 120, 240].map((nodeAngle, j) => (
                <motion.div
                  key={`node-${i}-${j}`}
                  className="absolute w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${nodeAngle}deg) translateX(128px)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: j * 0.3,
                  }}
                />
              ))}
            </motion.div>
          ))}

          {/* Data Cubes */}
          {[
            { x: 150, y: 0, z: 0, color: "from-blue-500 to-cyan-500" },
            { x: -150, y: 0, z: 0, color: "from-purple-500 to-pink-500" },
            { x: 0, y: 150, z: 0, color: "from-green-500 to-emerald-500" },
            { x: 0, y: -150, z: 0, color: "from-orange-500 to-red-500" },
            { x: 0, y: 0, z: 150, color: "from-indigo-500 to-blue-500" },
            { x: 0, y: 0, z: -150, color: "from-yellow-500 to-orange-500" },
          ].map((cube, i) => (
            <motion.div
              key={`cube-${i}`}
              className={`absolute w-12 h-12 bg-gradient-to-br ${cube.color} rounded-lg`}
              style={{
                transformStyle: "preserve-3d",
                transform: `translate3d(${cube.x}px, ${cube.y}px, ${cube.z}px)`,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-1 bg-white/20 rounded-md" />
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: "translateZ(0)" }}>
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 160 + Math.cos(angle) * 60;
              const y1 = 160 + Math.sin(angle) * 60;
              const x2 = 160 + Math.cos(angle) * 130;
              const y2 = 160 + Math.sin(angle) * 130;
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              );
            })}
          </svg>
        </motion.div>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-4 max-w-xs">
        <h3 className="text-sm mb-2">Interactive AI Model</h3>
        <p className="text-xs text-gray-400">
          Drag to rotate • Scroll to zoom • Click auto-rotate to animate
        </p>
      </div>
    </div>
  );
}

import { motion } from "motion/react";

interface AstrameLogoProps {
  className?: string;
  animated?: boolean;
  showText?: boolean;
}

export function AstrameLogo({ className = "w-10 h-10", animated = true, showText = false }: AstrameLogoProps) {
  const LogoContent = (
    <div className={`flex items-center gap-3 ${showText ? "" : className}`}>
      {/* Green Blade Logo */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={showText ? "w-10 h-10" : "w-full h-full"}
      >
        <defs>
          <linearGradient id="greenBladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="greenEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="greenGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="greenCenterGlow">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="1" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Complete 8-blade shuriken - single unified path */}
        <g filter="url(#greenGlow)">
          {/* Blade 1 - Top (0°) */}
          <path
            d="M 60 60 L 52 28 L 60 8 L 68 28 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 56 28 L 60 12 L 64 28 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />

          {/* Blade 2 - Top-Right (45°) */}
          <path
            d="M 60 60 L 79.8 40.2 L 92 28 L 79.8 40.2 L 88 48 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 76 44 L 86 34 L 78 42 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />

          {/* Blade 3 - Right (90°) */}
          <path
            d="M 60 60 L 92 52 L 112 60 L 92 68 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 92 56 L 108 60 L 92 64 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />

          {/* Blade 4 - Bottom-Right (135°) */}
          <path
            d="M 60 60 L 79.8 79.8 L 92 92 L 79.8 79.8 L 72 88 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 76 76 L 86 86 L 78 78 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />

          {/* Blade 5 - Bottom (180°) */}
          <path
            d="M 60 60 L 68 92 L 60 112 L 52 92 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 64 92 L 60 108 L 56 92 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />

          {/* Blade 6 - Bottom-Left (225°) */}
          <path
            d="M 60 60 L 40.2 79.8 L 28 92 L 40.2 79.8 L 32 72 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 44 76 L 34 86 L 42 78 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />

          {/* Blade 7 - Left (270°) */}
          <path
            d="M 60 60 L 28 68 L 8 60 L 28 52 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 28 64 L 12 60 L 28 56 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />

          {/* Blade 8 - Top-Left (315°) */}
          <path
            d="M 60 60 L 40.2 40.2 L 28 28 L 40.2 40.2 L 48 32 Z"
            fill="url(#greenBladeGradient)"
            stroke="#047857"
            strokeWidth="0.5"
          />
          <path
            d="M 60 60 L 44 44 L 34 34 L 42 42 Z"
            fill="url(#greenEdgeGradient)"
            opacity="0.5"
          />
        </g>

        {/* Connecting octagon base */}
        <path
          d="M 60 40 L 74.14 45.86 L 80 60 L 74.14 74.14 L 60 80 L 45.86 74.14 L 40 60 L 45.86 45.86 Z"
          fill="url(#greenBladeGradient)"
          stroke="#047857"
          strokeWidth="1"
          filter="url(#greenGlow)"
        />

        {/* Inner details */}
        <circle
          cx="60"
          cy="60"
          r="16"
          fill="url(#greenCenterGlow)"
          stroke="#34d399"
          strokeWidth="1"
        />
        <circle
          cx="60"
          cy="60"
          r="12"
          fill="#064e3b"
          opacity="0.9"
        />
        <circle
          cx="60"
          cy="60"
          r="8"
          fill="none"
          stroke="url(#greenEdgeGradient)"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="60"
          r="4"
          fill="#000000"
          opacity="0.7"
        />

        {/* Edge highlights on blades */}
        <g opacity="0.4">
          <line x1="60" y1="60" x2="60" y2="15" stroke="#6ee7b7" strokeWidth="1" />
          <line x1="60" y1="60" x2="82" y2="38" stroke="#6ee7b7" strokeWidth="1" />
          <line x1="60" y1="60" x2="105" y2="60" stroke="#6ee7b7" strokeWidth="1" />
          <line x1="60" y1="60" x2="82" y2="82" stroke="#6ee7b7" strokeWidth="1" />
          <line x1="60" y1="60" x2="60" y2="105" stroke="#6ee7b7" strokeWidth="1" />
          <line x1="60" y1="60" x2="38" y2="82" stroke="#6ee7b7" strokeWidth="1" />
          <line x1="60" y1="60" x2="15" y2="60" stroke="#6ee7b7" strokeWidth="1" />
          <line x1="60" y1="60" x2="38" y2="38" stroke="#6ee7b7" strokeWidth="1" />
        </g>
      </svg>

      {/* Text Logo */}
      {showText && (
        <span className="text-2xl tracking-wider bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
          Astramaie
        </span>
      )}
    </div>
  );

  if (!animated) {
    return LogoContent;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {LogoContent}
    </motion.div>
  );
}

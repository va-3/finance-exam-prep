import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  children?: ReactNode;
  label?: string;
  color?: 'blue' | 'green' | 'purple' | 'auto';
  showPercentage?: boolean;
  className?: string;
}

export default function ProgressRing({
  progress,
  size = 200,
  strokeWidth = 12,
  children,
  label,
  color = 'auto',
  showPercentage = true,
  className = '',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const getColorScheme = (value: number, colorOverride?: string) => {
    if (colorOverride === 'blue') {
      return {
        stroke: '#5B8DEF',
        glow: 'rgba(91, 141, 239, 0.4)',
        text: 'text-accent-blue',
      };
    }
    if (colorOverride === 'green') {
      return {
        stroke: '#2FC98C',
        glow: 'rgba(47, 201, 140, 0.4)',
        text: 'text-accent-green',
      };
    }
    if (colorOverride === 'purple') {
      return {
        stroke: '#8B7FF8',
        glow: 'rgba(139, 127, 248, 0.4)',
        text: 'text-accent-purple',
      };
    }

    // Auto color based on progress
    if (value >= 85) {
      return {
        stroke: '#2FC98C',
        glow: 'rgba(47, 201, 140, 0.4)',
        text: 'text-accent-green',
      };
    }
    if (value >= 70) {
      return {
        stroke: '#F5C344',
        glow: 'rgba(245, 195, 68, 0.4)',
        text: 'text-accent-yellow',
      };
    }
    if (value >= 30) {
      return {
        stroke: '#5B8DEF',
        glow: 'rgba(91, 141, 239, 0.4)',
        text: 'text-accent-blue',
      };
    }
    return {
      stroke: '#94a3b8',
      glow: 'rgba(148, 163, 184, 0.3)',
      text: 'text-text-muted',
    };
  };

  const colorScheme = getColorScheme(progress, color !== 'auto' ? color : undefined);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle with glow */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorScheme.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress-ring-circle"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.2,
          }}
          style={{
            filter: `drop-shadow(0 0 8px ${colorScheme.glow})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <div className={`text-6xl font-bold ${colorScheme.text}`}>
              {Math.round(progress)}%
            </div>
            {label && (
              <div className="text-sm text-text-tertiary mt-2 font-medium">
                {label}
              </div>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </div>
  );
}

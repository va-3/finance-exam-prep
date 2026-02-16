import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  disabled?: boolean;
  className?: string;
  animate?: 'shake' | 'pulse' | 'bounce' | null;
}

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  animate = null,
}: AnimatedButtonProps) {
  const baseClasses = 'font-semibold py-3 px-6 rounded-lg transition-all duration-200 min-h-[44px] cursor-pointer';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-accent-blue to-accent-blue-light text-white hover:shadow-lg',
    secondary: 'border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white',
    success: 'bg-gradient-to-r from-accent-green to-accent-green-light text-white hover:shadow-lg',
    danger: 'bg-gradient-to-r from-accent-red to-accent-red-light text-white hover:shadow-lg',
  };

  const animations = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.3, repeat: 2 },
    },
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 0.5, repeat: 1 },
    },
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      animate={animate ? animations[animate] : undefined}
    >
      {children}
    </motion.button>
  );
}

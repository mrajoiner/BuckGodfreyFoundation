import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInViewProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  margin?: string;
  className?: string;
  id?: string;
  once?: boolean;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 32,
  margin = '-60px',
  className = '',
  id,
  once = true,
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getTargetPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      id={id}
      initial={getInitialPosition()}
      whileInView={getTargetPosition()}
      viewport={{ once, margin: margin as any }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

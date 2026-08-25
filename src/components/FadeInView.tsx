import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'zoom-in' | 'none';

export interface FadeInViewProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  id?: string;
  once?: boolean;
  scale?: number;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.75,
  distance = 36,
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  className = '',
  id,
  once = true,
  scale = 1,
  ...props
}) => {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, scale: scale !== 1 ? scale : 0.98 };
      case 'down':
        return { opacity: 0, y: -distance, scale: scale !== 1 ? scale : 0.98 };
      case 'left':
        return { opacity: 0, x: distance, scale: scale !== 1 ? scale : 0.98 };
      case 'right':
        return { opacity: 0, x: -distance, scale: scale !== 1 ? scale : 0.98 };
      case 'zoom-in':
        return { opacity: 0, scale: 0.94, y: 16 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getTargetPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0, scale: 1 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0, scale: 1 };
      case 'zoom-in':
        return { opacity: 1, scale: 1, y: 0 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref as any}
      id={id}
      initial={getInitialPosition()}
      animate={hasIntersected ? getTargetPosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Premium luxury easeOutQuart curve
      }}
      className={`transform-gpu ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerGroupProps {
  children: React.ReactNode;
  staggerDelay?: number;
  baseDelay?: number;
  className?: string;
  threshold?: number;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  className = '',
  threshold = 0.12,
}) => {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        return (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={
              hasIntersected
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 32, scale: 0.98 }
            }
            transition={{
              duration: 0.7,
              delay: baseDelay + index * staggerDelay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="transform-gpu h-full"
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

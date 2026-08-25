import React, { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
}

export interface UseIntersectionObserverReturn<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T | null>;
  isIntersecting: boolean;
  hasIntersected: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  root = null,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
  disabled = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [hasIntersected, setHasIntersected] = useState<boolean>(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback for environments without IntersectionObserver
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entryRecord]) => {
        setEntry(entryRecord);
        const inView = entryRecord.isIntersecting;
        setIsIntersecting(inView);

        if (inView) {
          setHasIntersected(true);
          if (triggerOnce) {
            observer.unobserve(node);
            observer.disconnect();
          }
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, disabled]);

  return {
    ref,
    isIntersecting,
    hasIntersected,
    entry,
  };
}

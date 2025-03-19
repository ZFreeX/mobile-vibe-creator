import { useEffect, useState, useCallback } from 'react';

/**
 * Hook to apply an animation class after component mount
 */
export const useAnimationOnMount = (animationClass: string, delay = 0) => {
  const [animation, setAnimation] = useState(animationClass);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(animationClass);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [animationClass, delay]);
  
  return animation;
};

/**
 * Hook to stagger animations for a list of items
 */
export const useStaggeredAnimation = (itemCount: number, animationClass: string, staggerDelay = 100, initialDelay = 0) => {
  const [animations, setAnimations] = useState<string[]>(Array(itemCount).fill(animationClass));
  
  useEffect(() => {
    const timers = Array(itemCount).fill(0).map((_, index) => {
      return setTimeout(() => {
        setAnimations(prev => {
          const newAnimations = [...prev];
          newAnimations[index] = animationClass;
          return newAnimations;
        });
      }, initialDelay + (index * staggerDelay));
    });
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [itemCount, animationClass, staggerDelay, initialDelay]);
  
  return animations;
};

/**
 * Hook to trigger animation on scroll into view
 */
export const useAnimateOnScroll = (ref: React.RefObject<HTMLElement>, animationClass: string) => {
  const [animation, setAnimation] = useState(animationClass);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimation(animationClass);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, animationClass]);
  
  return animation;
};

/**
 * Function to create transition props for smooth page transitions
 */
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};
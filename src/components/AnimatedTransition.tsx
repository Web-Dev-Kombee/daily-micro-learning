
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { TransitionProps } from '@/types';
import { getAnimationClasses } from '@/utils/animations';

/**
 * AnimatedTransition - A component that animates its children when mounting/unmounting
 * 
 * @param {React.ReactNode} children - The content to be animated
 * @param {string} className - Additional classes to apply to the component
 * @param {boolean} show - Whether the component should be shown
 * @param {number} duration - Animation duration in milliseconds
 * @returns {React.ReactElement | null} - The animated component
 */
export const AnimatedTransition: React.FC<TransitionProps & {
  variant?: 'fade' | 'scale' | 'slide' | 'none';
}> = ({
  children,
  className,
  show = true,
  duration = 300,
  variant = 'fade'
}) => {
  const [render, setRender] = useState(show);
  
  useEffect(() => {
    if (show) setRender(true);
    
    let timeoutId: NodeJS.Timeout;
    if (!show && render) {
      timeoutId = setTimeout(() => {
        setRender(false);
      }, duration);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [show, render, duration]);
  
  if (!render) return null;
  
  return (
    <div
      className={cn(
        getAnimationClasses(variant, show, duration),
        className
      )}
      style={{ 
        animationDuration: `${duration}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;

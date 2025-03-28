
import { AnimationVariant } from '../types';

export const getAnimationClasses = (
  variant: AnimationVariant = 'fade',
  entering: boolean = true,
  duration: number = 300
): string => {
  const durationClass = duration === 300 
    ? '' 
    : duration <= 200 
      ? 'duration-200' 
      : 'duration-500';
  
  switch (variant) {
    case 'fade':
      return entering 
        ? `animate-fade-in ${durationClass}` 
        : `animate-fade-out ${durationClass}`;
    case 'scale':
      return entering 
        ? `animate-scale-in ${durationClass}` 
        : `animate-scale-out ${durationClass}`;
    case 'slide':
      return entering 
        ? `animate-slide-in ${durationClass}` 
        : `animate-slide-out ${durationClass}`;
    case 'none':
    default:
      return '';
  }
};

export const staggeredChildren = (
  totalChildren: number, 
  baseDelay: number = 100
): string[] => {
  return Array.from({ length: totalChildren }, (_, i) => {
    return `animation-delay-${(i + 1) * baseDelay}`;
  });
};

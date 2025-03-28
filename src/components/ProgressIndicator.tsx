
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * ProgressIndicator - A component that visualizes progress
 * 
 * @param {number} value - Current progress value (0-100)
 * @param {number} max - Maximum progress value
 * @param {string} className - Additional classes to apply 
 * @param {boolean} showLabel - Whether to show the progress label
 * @param {string} label - Custom label to display
 * @returns {React.ReactElement} - The progress indicator component
 */
interface ProgressIndicatorProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent' | 'subtle';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max = 100,
  className,
  showLabel = false,
  label,
  size = 'md',
  variant = 'default'
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };
  
  const variantClasses = {
    default: 'bg-primary',
    accent: 'bg-accent',
    subtle: 'bg-muted-foreground/30'
  };
  
  return (
    <div className={cn('w-full space-y-1', className)}>
      <div className="w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            'transition-all duration-500 ease-in-out rounded-full',
            sizeClasses[size],
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{label || `${Math.round(percentage)}%`}</span>
          {!label && <span>{max}</span>}
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;

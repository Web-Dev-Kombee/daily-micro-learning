
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { LearningContent } from '@/types';
import { Clock, ExternalLink } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

/**
 * LearningCard - Displays a single learning content item
 * 
 * @param {LearningContent} content - The learning content to display
 * @param {string} className - Additional classes to apply
 * @param {() => void} onComplete - Function called when the content is marked as complete
 * @returns {React.ReactElement} - The learning card component
 */
interface LearningCardProps {
  content: LearningContent;
  className?: string;
  onComplete?: () => void;
}

export const LearningCard: React.FC<LearningCardProps> = ({
  content,
  className,
  onComplete
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div 
      className={cn(
        'glass-morphism rounded-2xl overflow-hidden transition-all duration-300',
        expanded ? 'shadow-md' : 'shadow-sm',
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-medium text-balance">{content.title}</h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{formatDate(content.createdAt)}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" /> 
                <span>{content.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
        
        <AnimatedTransition 
          show={expanded} 
          className="pt-4"
        >
          <div className="prose prose-sm max-w-none">
            <p className="text-balance">{content.content}</p>
            
            {content.source && (
              <div className="mt-4 flex items-center text-sm text-accent">
                <a 
                  href={content.source} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline"
                >
                  <span>Source</span>
                  <ExternalLink className="ml-1 w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </AnimatedTransition>
      </div>
      
      <div className="px-6 pb-6 flex items-center justify-between">
        <button
          onClick={toggleExpand}
          className="text-sm font-medium text-accent hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
        
        {onComplete && (
          <button
            onClick={onComplete}
            className="text-sm font-medium px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
          >
            Mark as complete
          </button>
        )}
      </div>
    </div>
  );
};

export default LearningCard;

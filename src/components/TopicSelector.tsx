
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Topic } from '@/types';
import AnimatedTransition from './AnimatedTransition';

/**
 * TopicSelector - Displays a grid of selectable topics
 * 
 * @param {Topic[]} topics - Array of topics to display
 * @param {string} className - Additional classes to apply
 * @param {string} selectedTopicId - Currently selected topic ID
 * @param {(topic: Topic) => void} onSelect - Function called when a topic is selected
 * @returns {React.ReactElement} - The topic selector component
 */
interface TopicSelectorProps {
  topics: Topic[];
  className?: string;
  selectedTopicId?: string;
  onSelect?: (topic: Topic) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  topics,
  className,
  selectedTopicId,
  onSelect
}) => {
  return (
    <div 
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
        className
      )}
    >
      {topics.map((topic, index) => (
        <AnimatedTransition 
          key={topic.id}
          variant="scale"
          duration={400}
          className={`animation-delay-${index * 100}`}
        >
          {onSelect ? (
            <button
              onClick={() => onSelect(topic)}
              className={cn(
                'glass-morphism w-full p-6 rounded-2xl transition-all duration-300',
                'hover:translate-y-[-4px] hover:shadow-md',
                selectedTopicId === topic.id && 'ring-2 ring-accent/50'
              )}
            >
              <TopicContent topic={topic} />
            </button>
          ) : (
            <Link
              to={`/topic/${topic.id}`}
              className={cn(
                'glass-morphism block w-full p-6 rounded-2xl transition-all duration-300',
                'hover:translate-y-[-4px] hover:shadow-md'
              )}
            >
              <TopicContent topic={topic} />
            </Link>
          )}
        </AnimatedTransition>
      ))}
    </div>
  );
};

// Helper component to display topic content consistently
const TopicContent: React.FC<{ topic: Topic }> = ({ topic }) => (
  <div className="space-y-3">
    <div 
      className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center',
        `bg-${topic.color}-100 text-${topic.color}-500`
      )}
    >
      <span className="text-2xl">{topic.icon}</span>
    </div>
    <h3 className="font-medium text-xl">{topic.title}</h3>
    <p className="text-sm text-muted-foreground line-clamp-2">
      {topic.description}
    </p>
  </div>
);

export default TopicSelector;

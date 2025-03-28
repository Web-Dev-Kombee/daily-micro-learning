
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { LearningCard } from '@/components/LearningCard';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { useTopics } from '@/hooks/useTopics';
import { useLearning } from '@/hooks/useLearning';
import { ArrowLeft, BarChart, Sparkles } from 'lucide-react';

const Topic = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { getTopic } = useTopics();
  const { 
    content, 
    progress, 
    loading, 
    error, 
    generating,
    generateNewContent,
    completeLesson
  } = useLearning(topicId);
  
  const [scrolled, setScrolled] = useState(false);
  const topic = topicId ? getTopic(topicId) : undefined;
  
  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 px-6 text-center">
          <h2 className="text-2xl font-medium mb-4">Topic not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  const handleGenerateContent = () => {
    generateNewContent();
  };
  
  const handleCompleteLesson = (contentId: string) => {
    completeLesson(contentId);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header 
        transparent={!scrolled}
        title={topic.title}
        rightElement={
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-sm gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        }
      />
      
      {/* Topic Hero */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center px-6 pt-32 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        </div>
        
        <AnimatedTransition variant="fade" className="text-center max-w-2xl z-10">
          <div 
            className={`mx-auto w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-${topic.color}-100 text-${topic.color}-500`}
          >
            <span className="text-3xl">{topic.icon}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-medium mb-4">
            {topic.title}
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {topic.description}
          </p>
          
          {progress && (
            <div className="glass-morphism p-4 rounded-xl max-w-sm mx-auto">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium">Learning Progress</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {progress.streak} day streak
                </span>
              </div>
              <ProgressIndicator 
                value={progress.completedLessons} 
                max={10} 
                size="md" 
                variant="accent"
                showLabel 
                label={`${progress.completedLessons} lessons completed`}
              />
            </div>
          )}
        </AnimatedTransition>
      </section>
      
      {/* Learning Content */}
      <section className="px-6 py-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Your Learning Content</h2>
          
          <button
            onClick={handleGenerateContent}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md transition-colors hover:bg-accent/90 disabled:opacity-70"
          >
            <Sparkles className="w-4 h-4" />
            <span>{generating ? 'Generating...' : 'Generate New Knowledge'}</span>
          </button>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className="h-40 glass-morphism rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-muted-foreground glass-morphism rounded-2xl">
            <p>{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-md"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : content.length === 0 ? (
          <div className="p-8 text-center glass-morphism rounded-2xl">
            <p className="text-muted-foreground mb-4">
              No learning content available yet.
            </p>
            <button
              onClick={handleGenerateContent}
              disabled={generating}
              className="px-4 py-2 bg-accent text-accent-foreground rounded-md"
            >
              {generating ? 'Generating...' : 'Generate Your First Lesson'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {content.map((item, index) => (
              <AnimatedTransition
                key={item.id}
                variant="fade"
                className={`animation-delay-${index * 100}`}
              >
                <LearningCard
                  content={item}
                  onComplete={() => handleCompleteLesson(item.id)}
                />
              </AnimatedTransition>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Topic;

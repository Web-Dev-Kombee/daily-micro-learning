
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { TopicSelector } from '@/components/TopicSelector';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { useTopics } from '@/hooks/useTopics';
import { Topic } from '@/types';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const { topics, loading, error } = useTopics();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll events to change header appearance
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSelectTopic = (topic: Topic) => {
    navigate(`/topic/${topic.id}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header transparent={!scrolled} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-400/10 blur-3xl" />
        </div>
        
        <AnimatedTransition 
          variant="fade" 
          className="text-center max-w-2xl z-10"
        >
          <h1 className="text-4xl sm:text-5xl font-medium mb-6 text-balance leading-tight">
            Grow Your Knowledge with <span className="text-accent">AI-Powered</span> Micro-Learning
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Choose a topic and discover new insights every day. Just a few minutes of focused learning that adds up over time.
          </p>
          
          <button 
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
            className="flex items-center mx-auto gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full transition-transform hover:scale-105"
          >
            <span>Explore Topics</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </AnimatedTransition>
        
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-pulse-slow">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>
      
      {/* Topics Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <AnimatedTransition 
          variant="fade" 
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-medium mb-4">Choose Your Learning Path</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select a topic that interests you. Each path delivers bite-sized learning content tailored to your interests.
          </p>
        </AnimatedTransition>
        
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={i} 
                className="h-40 glass-morphism rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-md"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <TopicSelector topics={topics} onSelect={handleSelectTopic} />
        )}
      </section>
      
      {/* Features Section */}
      <section className="px-6 py-16 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <AnimatedTransition 
            variant="fade" 
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-medium mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our AI-powered platform makes learning effortless and efficient.
            </p>
          </AnimatedTransition>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Choose a Topic",
                description: "Select from our curated list of topics that align with your interests and goals.",
                icon: "🎯"
              },
              {
                title: "Daily Content",
                description: "Receive bite-sized learning material that takes just minutes to consume.",
                icon: "📚"
              },
              {
                title: "AI-Powered Insights",
                description: "Our AI finds the most relevant and up-to-date information for your learning journey.",
                icon: "✨"
              }
            ].map((feature, index) => (
              <AnimatedTransition 
                key={index}
                variant="scale"
                className={`glass-morphism p-6 rounded-2xl animation-delay-${index * 200}`}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </section>
      
      {/* Progress Tracking Preview */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <AnimatedTransition 
          variant="fade" 
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-medium mb-4">Track Your Progress</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Watch your knowledge grow day by day as you complete micro-learning sessions.
          </p>
        </AnimatedTransition>
        
        <div className="glass-morphism p-8 rounded-2xl max-w-xl mx-auto">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Web Development</h4>
                <span className="text-sm text-muted-foreground">12 days streak</span>
              </div>
              <ProgressIndicator 
                value={65} 
                max={100} 
                showLabel 
                size="md" 
                variant="accent" 
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Design Principles</h4>
                <span className="text-sm text-muted-foreground">8 days streak</span>
              </div>
              <ProgressIndicator 
                value={42} 
                max={100} 
                showLabel 
                size="md" 
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">Artificial Intelligence</h4>
                <span className="text-sm text-muted-foreground">5 days streak</span>
              </div>
              <ProgressIndicator 
                value={27} 
                max={100} 
                showLabel 
                size="md" 
                variant="subtle" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-6 py-12 bg-secondary/50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-muted-foreground">
            AI Knowledge Sprout © {new Date().getFullYear()} | Daily micro-learning powered by AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

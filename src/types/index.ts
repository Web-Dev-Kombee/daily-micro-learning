export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface LearningContent {
  id: string;
  topicId: string;
  title: string;
  content: string;
  source?: string;
  createdAt: string;
  readTime: number;
}

export interface UserProgress {
  id: string;
  topicId: string;
  completedLessons: number;
  lastActivity: string;
  streak: number;
}

export interface TransitionProps {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  duration?: number;
}

export type AnimationVariant = "fade" | "scale" | "slide" | "none";

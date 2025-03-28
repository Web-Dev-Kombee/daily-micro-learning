import { Topic, LearningContent } from "@/types";

// Mock AI service - in a real app, this would call an AI API
export const generateLearningContent = async (
  topic: Topic
): Promise<LearningContent> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock content generation based on topic
  const content = {
    id: Math.random().toString(36).substring(7),
    topicId: topic.id,
    title: `Understanding ${topic.title}`,
    content:
      `Here's a brief introduction to ${topic.title.toLowerCase()}:\n\n` +
      `1. Key Concept: ${topic.title} is a fundamental aspect of modern technology.\n` +
      `2. Importance: Understanding ${topic.title.toLowerCase()} is crucial for professional development.\n` +
      `3. Applications: ${topic.title} is used in various industries and domains.\n\n` +
      `This is a micro-learning snippet to help you grasp the basics of ${topic.title.toLowerCase()}. ` +
      `Stay tuned for more detailed content in future lessons.`,
    readTime: 2,
    createdAt: new Date().toISOString(),
  };

  return content;
};

export const generateTopicSuggestions = async (
  interests: string[]
): Promise<Topic[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock topic suggestions based on interests
  const topics: Topic[] = [
    {
      id: "1",
      title: "Artificial Intelligence",
      description: "Learn about the fundamentals of AI and machine learning.",
      icon: "🤖",
      color: "blue",
    },
    {
      id: "2",
      title: "Web Development",
      description: "Master modern web development technologies and practices.",
      icon: "🌐",
      color: "green",
    },
    {
      id: "3",
      title: "Data Science",
      description: "Explore data analysis and visualization techniques.",
      icon: "📊",
      color: "purple",
    },
  ];

  return topics;
};

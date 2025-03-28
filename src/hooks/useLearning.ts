import { useState, useEffect } from "react";
import { LearningContent, UserProgress } from "@/types";
import { generateLearningContent } from "@/lib/openai";
import { api } from "@/lib/api";

/**
 * useLearning - Hook for managing learning content and user progress
 *
 * @param {string} topicId - The ID of the current topic
 * @returns {Object} - Learning content, user progress, and related operations
 */
export const useLearning = (topicId: string | undefined) => {
  const [content, setContent] = useState<LearningContent[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (topicId) {
      loadContent();
      loadProgress();
    }
  }, [topicId]);

  const loadContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const content = await api.getContent(topicId!);
      setContent(content);
    } catch (err) {
      console.error("Error loading content:", err);
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      const progress = await api.getProgress(topicId!);
      setProgress(progress);
    } catch (err) {
      console.error("Failed to load progress:", err);
    }
  };

  const generateNewContent = async () => {
    if (!topicId) return;

    setGenerating(true);
    setError(null);

    try {
      const newContent = await generateLearningContent({
        id: topicId,
        title: "Sample Topic", // This will be replaced by the actual topic title
        description: "Sample Description",
        icon: "📚",
        color: "blue",
      });

      // Save to API
      const savedContent = await api.createContent(newContent);
      setContent((prev) => [savedContent, ...prev]);
    } catch (err) {
      console.error("Error generating content:", err);
      setError("Failed to generate new content");
    } finally {
      setGenerating(false);
    }
  };

  const completeLesson = async (contentId: string) => {
    try {
      const updatedProgress = await api.updateProgress(topicId!);
      setProgress(updatedProgress);
    } catch (err) {
      console.error("Failed to complete lesson:", err);
    }
  };

  return {
    content,
    progress,
    loading,
    error,
    generating,
    generateNewContent,
    completeLesson,
  };
};

export default useLearning;

import { useState, useEffect } from "react";
import { Topic } from "@/types";
import { api } from "@/lib/api";

/**
 * useTopics - Hook for managing topic data
 *
 * @returns {Object} - Topic data and operations
 */
export function useTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const topicsData = await api.getTopics();
        setTopics(topicsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError("Failed to load topics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const getTopic = (id: string): Topic | undefined => {
    return topics.find((topic) => topic.id === id);
  };

  return {
    topics,
    loading,
    error,
    getTopic,
  };
}

export default useTopics;

import React, { useState } from "react";
import { aiService } from "../../services/aiService";
import { Button } from "../ui/button";

export const ContentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Generate new topics for a category
      const newTopics = await aiService.generateTopics("technology");
      console.log("Generated topics:", newTopics);

      // Generate a lesson for one of the topics
      const lesson = await aiService.generateLesson(
        "JavaScript Basics",
        "beginner"
      );
      console.log("Generated lesson:", lesson);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate content"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={handleGenerateContent} disabled={loading}>
        {loading ? "Generating..." : "Generate New Content"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicSelection } from "../components/onboarding/TopicSelection";
import { ReminderSetup } from "../components/onboarding/ReminderSetup";
import { useAuth } from "../contexts/AuthContext";
import { Topic } from "../types";
import { useUpdateUserProfileMutation } from '../store/api';

const SAMPLE_TOPICS: Topic[] = [
  {
    id: "history",
    name: "History",
    description: "Learn about past events and civilizations",
    icon: "📚",
    category: "humanities",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Explore the latest tech trends",
    icon: "💻",
    category: "tech",
  },
  {
    id: "science",
    name: "Science",
    description: "Discover scientific concepts",
    icon: "🔬",
    category: "science",
  },
  {
    id: "math",
    name: "Math",
    description: "Learn math concepts",
    icon: "🧮",
    category: "math",
  },
  {
    id: "art",
    name: "Art",
    description: "Explore art history and techniques",
    icon: "🎨",
    category: "art",
  },
  {
    id: "music",
    name: "Music",
    description: "Learn music theory and history",
    icon: "🎵",
    category: "music",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Learn about sports history and statistics",
    icon: "🏆",
    category: "sports",
  },
  {
    id: "business",
    name: "Business",
    description: "Learn about business and finance",
    icon: "💼",
    category: "business",
  },
  {
    id: "health",
    name: "Health",
    description: "Learn about health and fitness",
    icon: "🏥",
    category: "health",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [reminderTime, setReminderTime] = useState("");
  const navigate = useNavigate();
  const { userProfile, loading } = useAuth();
  const [updateProfile] = useUpdateUserProfileMutation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (userProfile?.selectedTopics?.length ?? 0 > 0) {
    navigate("/");
    return null;
  }

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleTopicContinue = () => {
    setStep(2);
  };

  const handleReminderContinue = async () => {
    try {
      if (!userProfile?.id) {
        throw new Error("User ID is missing");
      }

      const updatedProfile = {
        ...userProfile,
        selectedTopics,
        reminderTime,
      };

      await updateProfile(updatedProfile).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <p>{JSON.stringify(userProfile)}</p>
      {step === 1 ? (
        <TopicSelection
          availableTopics={SAMPLE_TOPICS}
          selectedTopics={selectedTopics}
          onTopicSelect={handleTopicSelect}
          onContinue={handleTopicContinue}
        />
      ) : (
        <ReminderSetup
          selectedTime={reminderTime}
          onTimeChange={setReminderTime}
          onContinue={handleReminderContinue}
        />
      )}
    </div>
  );
}

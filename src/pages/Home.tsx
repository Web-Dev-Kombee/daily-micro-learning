import React from "react";
import { useNavigate } from "react-router-dom";
import { DailyLessonCard } from "../components/lessons/DailyLessonCard";
import { StreakTracker } from "../components/shared/StreakTracker";
import { useAuth } from "../contexts/AuthContext";
import { Lesson } from "../types";
import { useGetDailyLessonQuery } from '../store/api';

export default function Home() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const { data: dailyLesson, isLoading } = useGetDailyLessonQuery();

  const handleStartLesson = () => {
    if (dailyLesson) {
      navigate(`/lesson/${dailyLesson.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">
        Welcome back
        {userProfile?.displayName ? `, ${userProfile.displayName}` : ""}!
      </h1>
      <p className="text-muted-foreground mb-8">
        Ready for today's learning adventure?
      </p>

      <div className="space-y-8">
        {dailyLesson && (
          <DailyLessonCard
            lesson={dailyLesson as Lesson}
            onStartLesson={handleStartLesson}
          />
        )}

        <StreakTracker
          currentStreak={userProfile?.streak || 0}
          bestStreak={7} // TODO: Get from user profile
        />
      </div>
    </div>
  );
}

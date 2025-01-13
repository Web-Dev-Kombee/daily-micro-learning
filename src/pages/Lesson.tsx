import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Quiz } from "../components/lessons/Quiz";
import { Lesson as LessonType } from "../types";

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: lesson, isLoading } = useQuery<LessonType>({
    queryKey: ["lesson", id],
    queryFn: async () => {
      // TODO: Implement API call to fetch lesson
      return {
        id: "1",
        title: "Introduction to React Hooks",
        content: `Hooks are a powerful feature in React that allow you to use state and other React features
                 in functional components. They were introduced in React 16.8 and have revolutionized how
                 we write React components...`,
        topic: "Technology",
        type: "text",
        duration: 5,
        difficulty: "beginner",
        quiz: {
          id: "1",
          questions: [
            {
              id: "1",
              text: "What version of React introduced Hooks?",
              type: "multiple-choice",
              options: ["16.0", "16.8", "17.0", "18.0"],
              correctAnswer: "16.8",
              explanation: "React 16.8 was the first release to include Hooks.",
            },
          ],
        },
      };
    },
  });

  const [showQuiz, setShowQuiz] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <p>Lesson not found</p>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/")}>
        ← Back to Home
      </Button>

      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <span>{lesson.topic}</span>
            <span>•</span>
            <span>{lesson.duration} min read</span>
            <span>•</span>
            <span className="capitalize">{lesson.difficulty}</span>
          </div>

          {!showQuiz ? (
            <>
              <div className="prose dark:prose-invert max-w-none mb-8">
                {lesson.content}
              </div>
              <Button className="w-full" onClick={() => setShowQuiz(true)}>
                Take Quiz
              </Button>
            </>
          ) : (
            <Quiz
              quiz={lesson.quiz}
              onComplete={() => {
                // TODO: Handle quiz completion
                navigate("/");
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

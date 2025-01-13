import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Lesson } from "../../types";

interface DailyLessonCardProps {
  lesson: Lesson;
  onStartLesson: () => void;
}

export const DailyLessonCard: React.FC<DailyLessonCardProps> = ({
  lesson,
  onStartLesson,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {lesson.title}
          <span className="text-sm text-muted-foreground">
            {lesson.duration} min
          </span>
        </CardTitle>
        <CardDescription>{lesson.topic}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {lesson.content.substring(0, 150)}...
        </p>
        <Progress value={0} className="h-2" />
      </CardContent>
      <CardFooter>
        <Button onClick={onStartLesson} className="w-full">
          Start Today's Lesson
        </Button>
      </CardFooter>
    </Card>
  );
};

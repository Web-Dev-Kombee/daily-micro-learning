import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Quiz as QuizType, Question } from "../../types";

interface QuizProps {
  quiz: QuizType;
  onComplete: () => void;
}

export function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (showExplanation) {
      setShowExplanation(false);
      if (isLastQuestion) {
        onComplete();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    } else {
      setShowExplanation(true);
    }
  };

  const isCorrect =
    answers[currentQuestion.id] === currentQuestion.correctAnswer;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </h2>
        <p className="text-lg">{currentQuestion.text}</p>

        {!showExplanation && (
          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={handleAnswer}
          >
            {currentQuestion.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {showExplanation && (
          <div
            className={`p-4 rounded-lg ${
              isCorrect
                ? "bg-green-100 dark:bg-green-900"
                : "bg-red-100 dark:bg-red-900"
            }`}
          >
            <p className="font-semibold mb-2">
              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      <Button
        className="w-full"
        onClick={handleNext}
        disabled={!showExplanation && !answers[currentQuestion.id]}
      >
        {!showExplanation
          ? "Check Answer"
          : isLastQuestion
          ? "Complete Lesson"
          : "Next Question"}
      </Button>
    </div>
  );
}

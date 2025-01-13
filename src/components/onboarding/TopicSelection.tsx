import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Topic } from "../../types";

interface TopicSelectionProps {
  availableTopics: Topic[];
  selectedTopics: string[];
  onTopicSelect: (topicId: string) => void;
  onContinue: () => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({
  availableTopics,
  selectedTopics,
  onTopicSelect,
  onContinue,
}) => {
  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Choose Your Learning Topics</h1>
      <p className="text-muted-foreground mb-8">
        Select at least 3 topics that interest you. We'll customize your
        learning experience based on your choices.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {availableTopics.map((topic, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all ${
              selectedTopics.includes(topic.id) ? "border-primary" : ""
            }`}
            onClick={() => onTopicSelect(topic.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-4xl mb-2">{topic.icon}</div>
              <h3 className="font-medium">{topic.name}</h3>
              <p className="text-sm text-muted-foreground">
                {topic.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        className="w-full"
        disabled={selectedTopics.length < 3}
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  );
};

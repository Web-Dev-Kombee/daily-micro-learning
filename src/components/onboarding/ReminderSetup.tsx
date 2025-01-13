import React from "react";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface ReminderSetupProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  onContinue: () => void;
}

export const ReminderSetup: React.FC<ReminderSetupProps> = ({
  selectedTime,
  onTimeChange,
  onContinue,
}) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="container max-w-md mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Set Your Daily Reminder</h1>
      <p className="text-muted-foreground mb-8">
        Choose a time that works best for your daily learning session. We'll
        send you a friendly reminder.
      </p>

      <div className="space-y-6">
        <Select value={selectedTime} onValueChange={onTimeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select preferred time" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="w-full"
          onClick={onContinue}
          disabled={!selectedTime}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

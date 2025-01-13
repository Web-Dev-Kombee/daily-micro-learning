import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

interface StreakTrackerProps {
  currentStreak: number;
  bestStreak: number;
}

export const StreakTracker: React.FC<StreakTrackerProps> = ({
  currentStreak,
  bestStreak
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Learning Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-3xl font-bold">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{bestStreak}</p>
            <p className="text-sm text-muted-foreground">Best Streak</p>
          </div>
        </div>
        {currentStreak >= 7 && (
          <Badge className="mt-4 w-full justify-center" variant="secondary">
            🔥 Week Warrior!
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
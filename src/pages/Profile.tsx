import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { userProfile } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">
              {userProfile?.email}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Display Name</p>
            <p className="text-sm text-muted-foreground">
              {userProfile?.displayName || "Not set"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Learning Streak</p>
            <p className="text-sm text-muted-foreground">
              {userProfile?.streak} days
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Selected Topics</p>
            <div className="flex flex-wrap gap-2">
              {userProfile?.selectedTopics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{userProfile?.streak}</p>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">
              {userProfile?.selectedTopics.length}
            </p>
            <p className="text-sm text-muted-foreground">Topics Following</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/general/UI/card";
import { Badge } from "@/components/general/UI/badge";
import { Button } from "@/components/general/UI/button";
import { profileActivities } from "@/lib/dummy-database";

interface ActivityItem {
  id: string;
  type: "task" | "project" | "meeting" | "review" | "message";
  title: string;
  description: string;
  timestamp: string;
  status?: "completed" | "in-progress" | "pending";
}

export const ProfileActivity: React.FC = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task":
        return "✅";
      case "project":
        return "📋";
      case "meeting":
        return "🎯";
      case "review":
        return "👀";
      case "message":
        return "💬";
      default:
        return "📌";
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success" className="text-xs">
            Completed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="secondary" className="text-xs">
            In Progress
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-xs">
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - activityTime.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span>📈</span>
              Recent Activity
            </span>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 space-y-4 overflow-y-auto">
            {profileActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex-shrink-0 text-2xl">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h4 className="truncate text-sm font-medium">
                      {activity.title}
                    </h4>
                    {getStatusBadge(activity.status)}
                  </div>
                  <p className="mb-2 text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>⚡</span>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">📝</span>
              <span className="text-xs">Create Task</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">📊</span>
              <span className="text-xs">View Reports</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">👥</span>
              <span className="text-xs">Team Chat</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">📅</span>
              <span className="text-xs">Schedule</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">⚙️</span>
              <span className="text-xs">Settings</span>
            </Button>
            <Button
              variant="outline"
              className="flex h-20 flex-col items-center justify-center gap-2"
            >
              <span className="text-2xl">📋</span>
              <span className="text-xs">Projects</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

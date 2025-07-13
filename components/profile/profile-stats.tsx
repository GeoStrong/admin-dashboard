import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/general/UI/card";

interface ProfileStatsProps {
  stats: {
    tasksCompleted: number;
    projectsActive: number;
    teamMembers: number;
    experienceYears: number;
  };
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Tasks Completed",
      value: stats.tasksCompleted,
      icon: "✅",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Projects",
      value: stats.projectsActive,
      icon: "📋",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Team Members",
      value: stats.teamMembers,
      icon: "👥",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Years Experience",
      value: `${stats.experienceYears}+`,
      icon: "⭐",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-full p-3 ${stat.bgColor}`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

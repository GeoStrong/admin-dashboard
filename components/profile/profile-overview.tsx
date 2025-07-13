import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/general/UI/card";
import { Button } from "@/components/general/UI/button";
import { Badge } from "@/components/general/UI/badge";
import { UserProfile } from "@/lib/types/types";
import { profileSkills, profileAchievements } from "@/lib/dummy-database";

interface ProfileOverviewProps {
  profile: UserProfile;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  profile,
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* About Section */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📝</span>
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span>📧</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {profile.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <a
                    href={`tel:${profile.phoneNumber}`}
                    className="text-blue-600 hover:underline"
                  >
                    {profile.phoneNumber}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>🌍</span>
                  {profile.language}
                </p>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Skills & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {profileSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏆</span>
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profileAchievements.map((achievement, index) => (
              <div key={index} className="border-l-4 border-blue-500 py-2 pl-4">
                <h4 className="text-sm font-semibold">{achievement.title}</h4>
                <p className="mb-1 text-xs text-muted-foreground">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            View All Achievements
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

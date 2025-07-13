"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/general/UI/badge";
import { Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";
import { TeamMember } from "@/lib/types/types";

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="relative mb-4">
          <Image
            src={member.profileImage}
            alt={`${member.firstName} ${member.lastName}`}
            width={80}
            height={80}
            className="rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
          />
          <div
            className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white dark:border-gray-800 ${
              member.status === "active"
                ? "bg-green-500"
                : member.status === "on-leave"
                  ? "bg-yellow-500"
                  : "bg-gray-400"
            }`}
          />
        </div>

        {/* Name and Position */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {member.firstName} {member.lastName}
          </h3>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {member.position}
          </p>
        </div>

        {/* Status Badge */}
        <Badge className={`mb-4 ${getStatusColor(member.status)}`}>
          {member.status.charAt(0).toUpperCase() +
            member.status.slice(1).replace("-", " ")}
        </Badge>

        {/* Contact Information */}
        <div className="w-full space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{member.phoneNumber}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{member.location}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>{member.department}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Joined {formatDate(member.joinDate)}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-4 w-full">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Skills
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {member.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
              >
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                +{member.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;

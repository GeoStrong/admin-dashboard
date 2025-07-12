"use client";

import React from "react";
import TeamCard from "./team-card";
import { TeamMember } from "@/lib/types/types";

interface TeamGridProps {
  members: TeamMember[];
  loading?: boolean;
}

const TeamGrid: React.FC<TeamGridProps> = ({ members, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="mb-2 h-4 w-24 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="mb-4 h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
            <svg
              className="h-8 w-8 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            No team members found
          </h3>
          <p className="mb-4 text-gray-500 dark:text-gray-400">
            No team members match your current search criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => (
        <TeamCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default TeamGrid;

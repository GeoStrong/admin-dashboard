"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import { Plus } from "lucide-react";
import { TodoHeaderProps } from "@/lib/types/types";

const TodoHeader: React.FC<TodoHeaderProps> = ({ onAddTask }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        To-Do List
      </h1>

      <Button
        onClick={onAddTask}
        className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Task
      </Button>
    </div>
  );
};

export default TodoHeader;

"use client";

import React, { useState } from "react";
import { Button } from "@/components/general/UI/button";
import { Input } from "@/components/general/UI/input";
import { X } from "lucide-react";
import { AddTaskFormProps } from "@/lib/types/types";

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, onCancel }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-dark-150">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">
            Add New Task
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <Input
          type="text"
          placeholder="Enter task description..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full"
          autoFocus
        />

        <div className="flex items-center space-x-2">
          <Button
            type="submit"
            disabled={!taskText.trim()}
            className="bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            Add Task
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="px-4 py-2 text-sm"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;

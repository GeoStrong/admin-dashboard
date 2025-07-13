"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Star, X, GripVertical } from "lucide-react";
import { Checkbox } from "@/components/general/UI/checkbox";
import { TodoItemComponentProps } from "@/lib/types/types";

const TodoItemComponent: React.FC<TodoItemComponentProps> = ({
  todo,
  onToggleComplete,
  onToggleStar,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative mb-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-dark-150 ${
        todo.completed
          ? "border-blue-500 bg-blue-500 text-white"
          : "hover:border-gray-300 dark:hover:border-gray-600"
      } ${isDragging ? "z-50 opacity-50" : ""} transition-all duration-200`}
    >
      <div className="flex items-center space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing dark:hover:text-gray-300"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggleComplete(todo.id)}
          className={`${
            todo.completed
              ? "border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-500"
              : ""
          }`}
        />

        <span
          className={`flex-1 text-sm font-medium ${
            todo.completed
              ? "text-gray-900 line-through dark:text-white"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {todo.text}
        </span>

        <button
          onClick={() => onToggleStar(todo.id)}
          className={`rounded p-1 transition-colors ${
            todo.starred
              ? "text-yellow-500 hover:text-yellow-600"
              : todo.completed
                ? "text-white/70 hover:text-white"
                : "text-gray-400 hover:text-yellow-500"
          }`}
        >
          <Star className={`h-4 w-4 ${todo.starred ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className={`rounded p-1 transition-colors ${
            todo.completed
              ? "text-white/70 hover:text-white"
              : "text-gray-400 hover:text-red-500"
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TodoItemComponent;

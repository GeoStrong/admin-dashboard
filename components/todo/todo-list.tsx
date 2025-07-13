"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { TodoListProps } from "@/lib/types/types";
import TodoItemComponent from "./todo-item";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onReorder,
  onToggleComplete,
  onToggleStar,
  onDelete,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      const reorderedTodos = arrayMove(todos, oldIndex, newIndex).map(
        (todo, index) => ({
          ...todo,
          order: index,
        }),
      );

      onReorder(reorderedTodos);
    }
  };

  const todoIds = todos.map((todo) => todo.id);

  if (todos.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-lg text-gray-400 dark:text-gray-500">
          No tasks found
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Add a new task to get started
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItemComponent
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onToggleStar={onToggleStar}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;

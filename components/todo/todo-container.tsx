"use client";

import React, { useState } from "react";
import { TodoItem } from "@/lib/types/types";
import TodoHeader from "./todo-header";
import TodoList from "./todo-list";
import AddTaskForm from "./add-task-form";
import { initialTodos } from "@/lib/dummy-database";

const TodoContainer: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTask = (text: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      starred: false,
      order: todos.length,
    };
    setTodos([...todos, newTodo]);
    setShowAddForm(false);
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleToggleStar = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, starred: !todo.starred } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleReorder = (reorderedTodos: TodoItem[]) => {
    setTodos(reorderedTodos);
  };

  // Sort todos: completed items at bottom, others by order
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return a.order - b.order;
  });

  return (
    <div className="mx-auto max-w-4xl">
      <TodoHeader onAddTask={() => setShowAddForm(true)} />

      {showAddForm && (
        <AddTaskForm
          onAddTask={handleAddTask}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <TodoList
        todos={sortedTodos}
        onReorder={handleReorder}
        onToggleComplete={handleToggleComplete}
        onToggleStar={handleToggleStar}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TodoContainer;

import React from "react";
import TodoContainer from "@/components/todo/todo-container";

const ToDo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-dark-50">
      <TodoContainer />
    </div>
  );
};

export default ToDo;

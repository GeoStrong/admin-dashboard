"use client";

import React from "react";

interface UIElementsHeaderProps {
  title?: string;
  description?: string;
}

const UIElementsHeader: React.FC<UIElementsHeaderProps> = ({
  title = "UI Elements",
  description = "Comprehensive collection of charts and data visualizations",
}) => {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default UIElementsHeader;

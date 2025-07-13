"use client";

import React from "react";

const PricingHeader: React.FC = () => {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
        Choose Your Plan
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
        Select the perfect plan for your needs. All plans include our core
        features and can be upgraded at any time.
      </p>
    </div>
  );
};

export default PricingHeader;

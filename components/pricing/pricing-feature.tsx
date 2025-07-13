"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { PricingFeatureProps } from "@/lib/types/types";

const PricingFeature: React.FC<PricingFeatureProps> = ({ text, included }) => {
  return (
    <div className="flex items-center space-x-3">
      <div
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
          included
            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
        }`}
      >
        {included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </div>

      <span
        className={`text-sm ${
          included
            ? "text-gray-900 dark:text-white"
            : "text-gray-400 dark:text-gray-500"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default PricingFeature;

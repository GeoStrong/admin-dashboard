"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import PricingFeature from "./pricing-feature";
import { PricingCardProps } from "@/lib/types/types";

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <div
      className={`relative rounded-2xl border bg-white p-8 shadow-sm ${
        plan.isPopular ? "border-blue-200 shadow-blue-100" : "border-gray-200"
      } dark:border-gray-700 dark:bg-dark-150`}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <span className="rounded-full bg-blue-500 px-4 py-1 text-sm font-medium text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {plan.name}
        </h3>

        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {plan.period}
        </p>

        <div className="mb-8">
          <span className="text-4xl font-bold text-blue-500">{plan.price}</span>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        {plan.features.map((feature, index) => (
          <PricingFeature
            key={index}
            text={feature.text}
            included={feature.included}
          />
        ))}
      </div>

      <div className="space-y-3">
        <Button
          className={`w-full rounded-xl py-3 font-semibold ${
            plan.buttonVariant === "default"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
          variant={plan.buttonVariant}
        >
          {plan.buttonText}
        </Button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {plan.subText}
        </p>
      </div>
    </div>
  );
};

export default PricingCard;

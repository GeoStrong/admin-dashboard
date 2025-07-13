"use client";

import React from "react";
import PricingCard from "./pricing-card";
import { PricingGridProps } from "@/lib/types/types";

const PricingGrid: React.FC<PricingGridProps> = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default PricingGrid;

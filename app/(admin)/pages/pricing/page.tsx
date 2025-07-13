import React from "react";
import PricingHeader from "@/components/pricing/pricing-header";
import PricingGrid from "@/components/pricing/pricing-grid";
import PricingFAQ from "@/components/pricing/pricing-faq";
import { pricingFAQs, pricingPlans } from "@/lib/dummy-database";

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-dark-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PricingHeader />

        <PricingGrid plans={pricingPlans} />

        <PricingFAQ faqs={pricingFAQs} />
      </div>
    </div>
  );
};

export default Pricing;

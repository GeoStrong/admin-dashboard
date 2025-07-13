"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/general/UI/accordion";
import { PricingFAQProps } from "@/lib/types/types";

const PricingFAQ: React.FC<PricingFAQProps> = ({ faqs }) => {
  return (
    <div className="mt-16">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Got questions? We&apos;ve got answers.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-dark-150"
            >
              <AccordionTrigger className="py-4 text-left font-medium text-gray-900 hover:no-underline dark:text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-0">
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PricingFAQ;

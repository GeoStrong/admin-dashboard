"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../general/UI/accordion";

const ProductDescriptionAccordion: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <Accordion type="single" className="sm:w-1/2" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-md font-bold">
          Description
        </AccordionTrigger>
        <AccordionContent>{description}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default ProductDescriptionAccordion;

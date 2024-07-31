"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../general/UI/accordion";

const ProductDescriptionAccordion = ({ description }) => {
  return (
    <Accordion className="sm:w-1/2" collapsible>
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

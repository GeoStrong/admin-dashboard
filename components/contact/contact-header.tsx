"use client";

import React from "react";
import { Button } from "@/components/general/UI/button";
import { Plus } from "lucide-react";

const ContactHeader: React.FC = () => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Contact
      </h1>

      <Button className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600">
        <Plus className="mr-2 h-4 w-4" />
        Add New Contact
      </Button>
    </div>
  );
};

export default ContactHeader;

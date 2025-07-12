"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/general/UI/button";
import { Plus } from "lucide-react";

interface ContactHeaderProps {
  totalContacts?: number;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({ totalContacts }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact
        </h1>
        {totalContacts !== undefined && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {totalContacts} {totalContacts === 1 ? "contact" : "contacts"} total
          </p>
        )}
      </div>

      <Link href="/pages/contact/add">
        <Button className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Add New Contact
        </Button>
      </Link>
    </div>
  );
};

export default ContactHeader;

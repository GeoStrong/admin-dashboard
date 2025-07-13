"use client";

import React from "react";
import ContactCard from "./contact-card";
import { ContactProfile } from "@/lib/types/types";

interface ContactGridProps {
  contacts: ContactProfile[];
  loading?: boolean;
}

const ContactGrid: React.FC<ContactGridProps> = ({ contacts, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-dark-150"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-24 w-24 rounded-2xl bg-gray-200 dark:bg-gray-700" />
              <div className="mb-2 h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-6 h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-2 text-lg text-gray-400 dark:text-gray-500">
          No contacts found
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Add a new contact to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactGrid;

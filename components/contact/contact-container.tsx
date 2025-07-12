"use client";

import React, { useState, useEffect } from "react";
import { getProfiles } from "@/lib/actions/getAsyncData";
import ContactHeader from "./contact-header";
import ContactGrid from "./contact-grid";
import { ContactProfile } from "@/lib/types/types";

const ContactContainer: React.FC = () => {
  const [contacts, setContacts] = useState<ContactProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);

        try {
          const profilesData = await getProfiles();
          setContacts(profilesData);
        } catch (apiError) {
          console.warn("API call failed, using mock data:", apiError);
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (error && contacts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl">
        <ContactHeader />
        <div className="py-12 text-center">
          <div className="mb-2 text-lg text-red-500">
            Error loading contacts
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <ContactHeader />
      <ContactGrid contacts={contacts} loading={loading} />
    </div>
  );
};

export default ContactContainer;

"use client";

import React, { useState, useEffect } from "react";
import { getProfiles } from "@/lib/actions/getAsyncData";
import ContactHeader from "./contact-header";
import ContactGrid from "./contact-grid";
import ContactPagination from "./contact-pagination";
import ContactSearch from "./contact-search";
import { ContactProfile } from "@/lib/types/types";

const ContactContainer: React.FC = () => {
  const [contacts, setContacts] = useState<ContactProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(9); // 3x3 grid per page
  const [searchTerm, setSearchTerm] = useState("");

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
      <ContactHeader totalContacts={getFilteredContacts().length} />
      <ContactSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder="Search by name or email..."
      />
      <ContactGrid contacts={getCurrentPageContacts()} loading={loading} />
      {!loading && getFilteredContacts().length > 0 && (
        <ContactPagination
          currentPage={currentPage}
          totalPages={Math.ceil(getFilteredContacts().length / contactsPerPage)}
          onPageChange={handlePageChange}
          totalContacts={getFilteredContacts().length}
          contactsPerPage={contactsPerPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
      {!loading && getFilteredContacts().length === 0 && searchTerm && (
        <div className="py-12 text-center">
          <div className="mb-2 text-lg text-gray-400 dark:text-gray-500">
            No contacts found
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No contacts match &quot;{searchTerm}&quot;. Try searching with
            different keywords.
          </p>
        </div>
      )}
    </div>
  );

  // Helper functions
  function getFilteredContacts(): ContactProfile[] {
    if (!searchTerm.trim()) {
      return contacts;
    }

    return contacts.filter(
      (contact) =>
        contact.profiles.fullname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        contact.profiles.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  function getCurrentPageContacts(): ContactProfile[] {
    const filteredContacts = getFilteredContacts();
    const startIndex = (currentPage - 1) * contactsPerPage;
    const endIndex = startIndex + contactsPerPage;
    return filteredContacts.slice(startIndex, endIndex);
  }

  function handlePageChange(page: number): void {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePageSizeChange(newPageSize: number): void {
    setContactsPerPage(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
    // Scroll to top when page size changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearchChange(newSearchTerm: string): void {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Reset to first page when searching
  }
};

export default ContactContainer;

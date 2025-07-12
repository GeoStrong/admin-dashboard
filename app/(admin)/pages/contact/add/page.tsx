import AddContactForm from "@/components/contact/add-contact-form";
import React from "react";

const AddContact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-dark-50">
      <div className="mx-auto max-w-2xl">
        <AddContactForm />
      </div>
    </div>
  );
};

export default AddContact;

"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/general/UI/button";
import { Input } from "@/components/general/UI/input";
import { Label } from "@/components/general/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/general/UI/select";
import { Camera, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ContactFormData } from "@/lib/types/types";

const AddContactForm: React.FC = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "male",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          profileImage: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - in real app, this would save to backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Contact added successfully!", {
        description: `${formData.firstName} ${formData.lastName} has been added to your contacts.`,
      });

      // Redirect back to contacts page
      router.push("/pages/contact");
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("Failed to add contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-dark-150">
      {/* Header */}
      <div className="mb-8 flex items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={handleBack}
          className="mr-4 p-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Contact
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Upload */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <Camera className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-blue-500 hover:text-blue-600"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-gray-700 dark:text-gray-300"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-dark-100"
              required
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-gray-700 dark:text-gray-300"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-dark-100"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Your email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-dark-100"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-dark-100"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label
              htmlFor="dateOfBirth"
              className="text-gray-700 dark:text-gray-300"
            >
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              placeholder="Enter your birthdate"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-dark-100"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className="text-gray-700 dark:text-gray-300"
            >
              Gender
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value: "male" | "female" | "other") =>
                handleInputChange("gender", value)
              }
            >
              <SelectTrigger className="border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-dark-100">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 py-3 text-lg font-medium text-white hover:bg-blue-600"
          >
            {loading ? "Adding Contact..." : "Add Now"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddContactForm;

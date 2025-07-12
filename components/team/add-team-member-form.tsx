"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/general/UI/card";
import { ArrowLeft, Upload, X } from "lucide-react";
import { TeamFormData } from "@/lib/types/types";
import { toast } from "sonner";

const AddTeamMemberForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState<TeamFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    position: "",
    department: "",
    profileImage: "",
    skills: [],
    location: "",
  });

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Design",
    "Operations",
  ];
  const positions = [
    "Software Engineer",
    "Senior Developer",
    "Product Manager",
    "UX Designer",
    "Marketing Manager",
    "Sales Representative",
    "HR Specialist",
    "Financial Analyst",
    "DevOps Engineer",
    "QA Engineer",
    "Data Scientist",
    "Project Manager",
  ];
  const locations = [
    "New York",
    "San Francisco",
    "London",
    "Berlin",
    "Tokyo",
    "Remote",
  ];

  const handleInputChange = (field: keyof TeamFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setFormData((prev) => ({ ...prev, skills: updatedSkills }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
    setFormData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.position) {
      toast.error("Position is required");
      return;
    }
    if (!formData.department) {
      toast.error("Department is required");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Team member added successfully!");
      router.push("/pages/team");
    } catch (error) {
      toast.error("Failed to add team member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/pages/team");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Team
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Add New Team Member
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in the information below to add a new team member
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Member Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image */}
              <div>
                <Label>Profile Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    Upload Image
                  </Button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) =>
                      handleInputChange("position", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      handleInputChange("department", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    handleInputChange("location", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Skills */}
              <div>
                <Label>Skills</Label>
                <div className="mt-2 space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      Add
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-6">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Adding..." : "Add Team Member"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTeamMemberForm;

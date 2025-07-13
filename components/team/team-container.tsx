"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import TeamHeader from "./team-header";
import TeamSearch from "./team-search";
import TeamFilters from "./team-filters";
import TeamGrid from "./team-grid";
import TeamPagination from "./team-pagination";
import {
  teamMembers,
  teamDepartments,
  teamStatuses,
} from "@/lib/dummy-database";
import {
  filterTeamMembers,
  paginateTeamMembers,
  getTotalTeamPages,
} from "@/lib/functions/functions";

const TeamContainer: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  // Filter and paginate team members
  const filteredMembers = useMemo(() => {
    return filterTeamMembers(teamMembers, {
      department: selectedDepartment,
      status: selectedStatus,
      search: searchTerm,
    });
  }, [searchTerm, selectedDepartment, selectedStatus]);

  const totalPages = getTotalTeamPages(filteredMembers.length, itemsPerPage);
  const paginatedMembers = useMemo(() => {
    return paginateTeamMembers(filteredMembers, currentPage, itemsPerPage);
  }, [filteredMembers, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedStatus, itemsPerPage]);

  const handleAddMember = () => {
    router.push("/pages/team/add");
  };

  const handleFilterClick = () => {
    // Filter is already visible, could implement a modal here if needed
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <TeamHeader
          memberCount={teamMembers.length}
          onAddMember={handleAddMember}
          onFilterClick={handleFilterClick}
        />

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TeamSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            <div>
              <TeamFilters
                selectedDepartment={selectedDepartment}
                selectedStatus={selectedStatus}
                onDepartmentChange={setSelectedDepartment}
                onStatusChange={setSelectedStatus}
                departments={teamDepartments}
                statuses={teamStatuses}
              />
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="mb-8">
          <TeamGrid members={paginatedMembers} loading={loading} />
        </div>

        {/* Pagination */}
        {filteredMembers.length > 0 && (
          <TeamPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredMembers.length}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default TeamContainer;

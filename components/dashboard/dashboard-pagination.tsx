"use client";

import React from "react";
import useLocation from "@/lib/hooks/useLocation";
import { dashboardLinks } from "@/lib/dummy-database";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../general/UI/pagination";

const DashboardPagination: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {dashboardLinks.map((link, index) => (
          <PaginationItem key={link.name}>
            <PaginationLink
              href={link.href}
              isActive={pathname === link.href}
              size="default"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default DashboardPagination;

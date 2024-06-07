"use client";

import useLocation from "@/lib/hooks/useLocation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../general/UI/pagination";
import { dashboardLinks } from "@/lib/dummy-database";

const DashboardPagination = () => {
  const { pathname } = useLocation();

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {dashboardLinks.map((link, index) => (
          <PaginationItem key={link.name}>
            <PaginationLink href={link.href} isActive={pathname === link.href}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default DashboardPagination;

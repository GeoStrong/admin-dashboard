"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/general/UI/dropdown-menu";
import ProfileSettings from "../profile/profile-settings";
import { LogOut, Moon, PlusCircle, Sun } from "lucide-react";
import { MdSystemSecurityUpdateGood } from "react-icons/md";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfileMenu: React.FC = () => {
  const { setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication tokens/data here if you have them
    // For now, just redirect to login page
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileSettings />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/account/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/account/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="sm:hidden">
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <MdSystemSecurityUpdateGood className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileMenu;

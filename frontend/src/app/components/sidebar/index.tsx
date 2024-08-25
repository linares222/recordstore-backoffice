"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarOpen } from "@/state";
import {
  LayoutDashboardIcon,
  LibraryBig,
  LucideIcon,
  Menu,
  Package,
  PackageOpen,
  ReceiptEuro,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SidebarTabType = {
  title: string;
  href: string;
  icon: LucideIcon;
  activeIcon?: LucideIcon;
  isOpen: boolean;
};

const SidebarTab = ({
  title,
  href,
  icon: Icon,
  activeIcon: ActiveIcon,
  isOpen,
}: SidebarTabType) => {
  const pathname = usePathname();
  const isCurrent =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`${
          isCurrent && "bg-blue-400 text-white"
        } flex items-center space-x-2 hover:text-gray-900 hover:bg-blue-100 px-6 py-4 ${
          isOpen ? "justify-start px-8": "justify-center" 
        }`}
      >
        {isCurrent && ActiveIcon !== undefined ? (
          <ActiveIcon className="icon-fixed" />
        ) : (
          <Icon className="icon-fixed" />
        )}
        {isOpen && <p className="text-lg font-semibold">{title}</p>}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const isSidebarOpen = useAppSelector((state) => state.global.isSidebarOpen);
  const dispatch = useAppDispatch();

  const toggleSidebar = (open:boolean) => {
    dispatch(setIsSidebarOpen(open));
  };

  return (
    <div
      onMouseEnter={()=>toggleSidebar(true)}
      onMouseLeave={()=>toggleSidebar(false)}
      className={`fixed flex flex-col bg-white ${
        isSidebarOpen ? "w-72 md:w-64" : "w-20"
      } h-full shadow-md z-50 overflow-hidden transition-all duration-300`}
    >
      {/* logo */}
      <div className="flex justify-center items-center pt-8 gap-1">
        <img src="https://recordstore-backoffice.s3.eu-west-3.amazonaws.com/logo.png" className={`h-14 w-14 ${isSidebarOpen && "h-20 w-20"}`}/>
        {isSidebarOpen && <p className="text-xl font-bold ">CRATEKEEPR</p>}
      </div>
      <div className="flex-grow mt-8">
        <SidebarTab
          title="Dashboard"
          href="/"
          icon={LayoutDashboardIcon}
          isOpen={isSidebarOpen}
        />
        <SidebarTab
          title="Inventory"
          href="/inventory"
          icon={Package}
          activeIcon={PackageOpen}
          isOpen={isSidebarOpen}
        />
        <SidebarTab
          title="Products"
          href="/products"
          icon={LibraryBig}
          isOpen={isSidebarOpen}
        />
        <SidebarTab
          title="Users"
          href="/users"
          icon={User}
          isOpen={isSidebarOpen}
        />
        <SidebarTab
          title="Expenses"
          href="/expenses"
          icon={ReceiptEuro}
          isOpen={isSidebarOpen}
        />

      </div>
      {/* footer */}
      <div className="text-xs text-gray-500 text-center">
        &copy; 2024 CRATEKEEPR
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import StoreProvider, { useAppSelector } from "./redux";

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapperLayout = ({ children }: PageWrapperProps) => {
  const isSidebarOpen = useAppSelector((state) => state.global.isSidebarOpen);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    //control the html elements without making it client side
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.add("light");
  });

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "dark" : "light"
      } bg-gray-50 text-gray-900 `}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full bg-gray-50 px-9 py-7 ${
          isSidebarOpen ? "md:pl-72" : "md:pl-24"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <StoreProvider>
      <PageWrapperLayout>{children}</PageWrapperLayout>
    </StoreProvider>
  );
};

export default PageWrapper;

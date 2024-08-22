"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/state";
import { Avatar } from "@mui/material";
import { Bell, Moon, SearchIcon, Settings, Sun } from "lucide-react";
import React from "react";

const Navbar = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const dispatch = useAppDispatch();
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex justify-between w-full items-center space-x-2 pl-20 md:pr-4 md:pl-0 mb-4">
      <div className="flex items-center w-full space-x-4 ">
        <form
          action=""
          className="max-w-xs bg-white h-14 border-2 rounded-lg flex items-center space-x-1 p-2 flex-1 mx-2 md:max-w-lg"
        >
          <SearchIcon size={20} className="text-gray-500" />
          <input
            className="bg-transparent flex-1 outline-none"
            type="text"
            placeholder="Search for a record"
          />
        </form>
      </div>
      <div className="flex items-center space-x-4 ">
        <button className="hidden sm:block" onClick={toggleDarkMode}>
          {isDarkMode ? <Moon size={28} /> : <Sun size={28} />}
        </button>
        <button className="hidden sm:block relative">
          <Bell size={28} />
          <span className="absolute -top-1 -right-0.5 bg-blue-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </button>

        <div className="hidden sm:block w-[1px] bg-slate-400 h-8 mx-2" />
        <button>
          <Avatar alt="User profile picture" src="" />
        </button>
        <button className="hidden sm:block">
          <Settings size={28} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

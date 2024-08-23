"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, Bell, Moon, Globe, LogOut } from "lucide-react";

const SettingsBtn = () => {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");

  const handleToggleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleLogout = (): void => {
    console.log("logging out");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="active:outline-none">
          <Settings size={28} />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </div>
          <Switch
            checked={notifications}
            onClick={handleToggleClick}
            onCheckedChange={setNotifications}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between">
          <div className="flex items-center">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </div>
          <Switch
            checked={darkMode}
            onClick={handleToggleClick}
            onCheckedChange={setDarkMode}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            <span>Language</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className={language === "EN" ? "font-bold" : ""}>EN</span>
            <Switch
              checked={language === "PT"}
              onClick={handleToggleClick}
              onCheckedChange={(checked: boolean) =>
                setLanguage(checked ? "PT" : "EN")
              }
            />
            <span className={language === "PT" ? "font-bold" : ""}>PT</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsBtn;

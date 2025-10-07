import { useState } from "react";
import { Search, Bell, MessageSquare, User, ChevronDown, Menu, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationPopup } from "@/components/ui/notification-popup";
// import { cn } from "@/lib/utils";

export function AppHeader() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground " />
            <Input
              placeholder="Search anything..."
              className="w-80 pl-10 bg-headerSearch border-0 focus:bg-background placeholder:text-placeholder"
            />
             <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center justify-center">
                    <span
                      className="hidden sm:flex gap-1 text-tertiary text-sm bg-background leading-5 py-0.5 px-2.5 rounded-md"
                      style={{ opacity: 1 }}
                    >
                      <span className="sr-only">Press </span>
                      <kbd className="font-sans">
                        <abbr title="Command" className="no-underline">
                          ⌘
                        </abbr>
                      </kbd>
                      <span className="sr-only"> and </span>
                      <kbd className="font-sans">F</kbd>
                      <span className="sr-only"> to search</span>
                    </span>
                  </div>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Documents
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            News
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Payslip
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Report
          </Button>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Mail className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute top-[10px] right-[10px] w-2 h-2 text-xs flex items-center justify-center p-0"
            >
              {/* 3 */}
            </Badge>
          </Button>

          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute top-[10px] right-[10px] w-2 h-2 text-xs flex items-center justify-center p-0"
            >
              {/* 2 */}
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/Avatar.png" />
                  {/* <AvatarFallback className="bg-primary text-primary-foreground">
                    PC
                  </AvatarFallback> */}
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <NotificationPopup 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
}
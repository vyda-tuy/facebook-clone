"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Home,
  Users,
  PlayCircle,
  Store,
  Gamepad2,
  Menu,
  Bell,
  MessageCircle,
  Search,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: Users, label: "Friends", href: "/friends" },
  { icon: PlayCircle, label: "Watch", href: "/watch" },
  { icon: Store, label: "Marketplace", href: "/marketplace" },
  { icon: Gamepad2, label: "Gaming", href: "/gaming" },
];

export function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <TooltipProvider>
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-card border-b border-border shadow-sm">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center gap-2">
            {/* Facebook Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">f</span>
              </div>
            </Link>

            {/* Search */}
            <div
              className={cn(
                "relative transition-all duration-200",
                searchFocused ? "w-64" : "w-10 md:w-60"
              )}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Facebook"
                className={cn(
                  "pl-10 h-10 rounded-full bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary transition-all",
                  !searchFocused && "md:pl-10 pl-10 w-10 md:w-full"
                )}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-lg mx-4">
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex-1 flex items-center justify-center h-12 rounded-lg mx-0.5 transition-colors relative group",
                      item.active
                        ? "text-primary"
                        : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon className="h-6 w-6" />
                    {item.active && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full bg-secondary h-10 w-10"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Create Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-secondary h-10 w-10 hidden sm:flex"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create</p>
              </TooltipContent>
            </Tooltip>

            {/* Messenger */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-secondary h-10 w-10 relative"
                >
                  <MessageCircle className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-card">
                    3
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Messenger</p>
              </TooltipContent>
            </Tooltip>

            {/* Notifications */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-secondary h-10 w-10 relative"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-2 border-card">
                    9
                  </Badge>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-10 w-10 p-0 relative"
                >
                  <Avatar className="h-10 w-10 border-2 border-secondary">
                    <AvatarImage src="/avatars/pichvyda.png" />
                    <AvatarFallback>PT</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-secondary rounded-full flex items-center justify-center border border-card">
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-2">
                <Link href="/profile/pichvydatuy">
                  <DropdownMenuItem className="p-3 cursor-pointer rounded-lg">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="/avatars/pichvyda.png" />
                      <AvatarFallback>PT</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Pichvyda Tuy</p>
                      <p className="text-sm text-muted-foreground">See your profile</p>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 cursor-pointer rounded-lg">
                  Settings & Privacy
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer rounded-lg">
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer rounded-lg">
                  Display & Accessibility
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 cursor-pointer rounded-lg text-destructive">
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}

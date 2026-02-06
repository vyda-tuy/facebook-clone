"use client";

import Link from "next/link";
import {
    Users,
    Clock,
    Bookmark,
    Calendar,
    Flag,
    UsersRound,
    PlayCircle,
    Newspaper,
    Heart,
    ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const shortcuts = [
    { icon: Users, label: "Friends", href: "/friends", color: "text-blue-500" },
    { icon: Clock, label: "Memories", href: "/memories", color: "text-cyan-500" },
    { icon: Bookmark, label: "Saved", href: "/saved", color: "text-purple-500" },
    { icon: UsersRound, label: "Groups", href: "/groups", color: "text-blue-400" },
    { icon: PlayCircle, label: "Video", href: "/watch", color: "text-sky-500" },
    { icon: Calendar, label: "Events", href: "/events", color: "text-red-400" },
    { icon: Newspaper, label: "Feeds", href: "/feeds", color: "text-orange-500" },
    { icon: Flag, label: "Pages", href: "/pages", color: "text-amber-500" },
    { icon: Heart, label: "Fundraisers", href: "/fundraisers", color: "text-pink-500" },
];

const yourGroups = [
    { name: "React Developers", avatar: "react", members: "2.1M" },
    { name: "UI/UX Designers", avatar: "design", members: "890K" },
    { name: "Tech Startups", avatar: "startup", members: "456K" },
];

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-14 bottom-0 w-[280px] hidden lg:block">
            <ScrollArea className="h-full p-2">
                <div className="space-y-1">
                    {/* User Profile */}
                    <Link
                        href="/profile/pichvydatuy"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/avatars/pichvyda.png" />
                            <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Pichvyda Tuy</span>
                    </Link>

                    {/* Shortcuts */}
                    {shortcuts.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <div
                                className={cn(
                                    "h-9 w-9 rounded-full bg-secondary flex items-center justify-center",
                                    item.color
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}

                    {/* See More */}
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 p-2 h-auto font-medium"
                    >
                        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                            <ChevronDown className="h-5 w-5" />
                        </div>
                        See more
                    </Button>

                    <Separator className="my-3" />

                    {/* Your Shortcuts */}
                    <div className="px-2">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-muted-foreground font-semibold text-sm">
                                Your shortcuts
                            </h3>
                            <Button variant="link" className="text-primary p-0 h-auto text-sm">
                                Edit
                            </Button>
                        </div>
                    </div>

                    {yourGroups.map((group) => (
                        <Link
                            key={group.name}
                            href={`/groups/${group.avatar}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <Avatar className="h-9 w-9 rounded-lg">
                                <AvatarImage
                                    src={`https://api.dicebear.com/7.x/shapes/svg?seed=${group.avatar}`}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {group.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{group.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 px-2 pb-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Privacy · Terms · Advertising · Ad Choices · Cookies · More · Meta © 2024
                    </p>
                </div>
            </ScrollArea>
        </aside>
    );
}

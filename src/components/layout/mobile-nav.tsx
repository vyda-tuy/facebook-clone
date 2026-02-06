"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, PlayCircle, Bell, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Friends", href: "/friends" },
    { icon: PlayCircle, label: "Watch", href: "/watch" },
    { icon: Bell, label: "Notifications", href: "/notifications", badge: 9 },
    { icon: Menu, label: "Menu", href: "/menu" },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-14 bg-card border-t border-border md:hidden">
            <div className="h-full flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 h-full relative transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <div className="relative">
                                <item.icon className="h-6 w-6" />
                                {item.badge && (
                                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white">
                                        {item.badge}
                                    </Badge>
                                )}
                            </div>
                            {isActive && (
                                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

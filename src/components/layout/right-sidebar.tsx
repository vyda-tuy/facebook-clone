"use client";

import Link from "next/link";
import {
    UserPlus,
    Gift,
    MoreHorizontal,
    Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { openChat } from "@/components/chat/chat-manager";

const contacts = [
    { name: "Sarah Wilson", avatar: "sarah", online: true },
    { name: "Mike Johnson", avatar: "mike", online: true },
    { name: "Emily Davis", avatar: "emily", online: true },
    { name: "Chris Brown", avatar: "chris", online: false },
    { name: "Jessica Lee", avatar: "jessica", online: true },
    { name: "David Miller", avatar: "david", online: false },
    { name: "Amanda White", avatar: "amanda", online: true },
    { name: "Ryan Garcia", avatar: "ryan", online: false },
];

const birthdays = [
    { name: "Alex Thompson", avatar: "alex" },
];

const sponsoredAds = [
    {
        title: "Learn React Today",
        description: "Master modern web development",
        image: "reactcourse",
        sponsor: "codecademy.com",
    },
];

export function RightSidebar() {
    const handleContactClick = (contact: typeof contacts[0]) => {
        openChat({
            name: contact.name,
            avatar: contact.avatar,
            online: contact.online,
        });
    };

    return (
        <aside className="fixed right-0 top-14 bottom-0 w-[280px] hidden xl:block">
            <ScrollArea className="h-full p-2">
                {/* Sponsored */}
                <div className="mb-4">
                    <h3 className="px-2 mb-2 text-muted-foreground font-semibold text-sm">
                        Sponsored
                    </h3>
                    {sponsoredAds.map((ad) => (
                        <Link
                            key={ad.title}
                            href="#"
                            className="flex gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                                <img
                                    src={`https://api.dicebear.com/7.x/shapes/svg?seed=${ad.image}`}
                                    alt={ad.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-sm">{ad.title}</p>
                                <p className="text-xs text-muted-foreground">{ad.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{ad.sponsor}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Birthdays */}
                {birthdays.length > 0 && (
                    <Card className="mb-4 border-0 shadow-none bg-transparent">
                        <CardHeader className="p-2 pb-0">
                            <CardTitle className="text-muted-foreground font-semibold text-sm flex items-center gap-2">
                                <Gift className="h-4 w-4 text-pink-500" />
                                Birthdays
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-2">
                            {birthdays.map((person) => (
                                <div
                                    key={person.name}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.avatar}`}
                                        />
                                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-semibold">{person.name}</span>&apos;s birthday
                                            is today.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Contacts */}
                <div>
                    <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="text-muted-foreground font-semibold text-sm">Contacts</h3>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Search className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {contacts.map((contact) => (
                        <button
                            key={contact.name}
                            onClick={() => handleContactClick(contact)}
                            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                        >
                            <div className="relative">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}`}
                                    />
                                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {contact.online && (
                                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card" />
                                )}
                            </div>
                            <span className="font-medium text-sm">{contact.name}</span>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    );
}

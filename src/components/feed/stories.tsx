"use client";

import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const stories = [
    { id: "create", name: "Create story", isCreate: true },
    {
        id: "1",
        name: "Sarah Wilson",
        avatar: "sarah",
        image: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400&h=600&fit=crop",
        hasNew: true,
    },
    {
        id: "2",
        name: "Mike Johnson",
        avatar: "mike",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
        hasNew: true,
    },
    {
        id: "3",
        name: "Emily Davis",
        avatar: "emily",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
        hasNew: true,
    },
    {
        id: "4",
        name: "Chris Brown",
        avatar: "chris",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
        hasNew: false,
    },
    {
        id: "5",
        name: "Jessica Lee",
        avatar: "jessica",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
        hasNew: true,
    },
];

export function Stories() {
    return (
        <Card className="mb-4 p-3 shadow-sm">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2">
                    {stories.map((story) => (
                        <button
                            key={story.id}
                            className={cn(
                                "relative flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden group transition-transform hover:scale-[1.02]",
                                story.isCreate ? "bg-card border-2 border-dashed border-border" : ""
                            )}
                        >
                            {story.isCreate ? (
                                <>
                                    {/* User's photo as background */}
                                    <div className="absolute inset-x-0 top-0 h-3/4 bg-gradient-to-br from-blue-400 to-blue-600">
                                        <img
                                            src="/avatars/pichvyda.png"
                                            alt="Your profile"
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                    </div>
                                    {/* Create button */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-card flex flex-col items-center justify-end pb-3">
                                        <div className="absolute top-0 -translate-y-1/2 h-10 w-10 rounded-full bg-primary flex items-center justify-center ring-4 ring-card">
                                            <Plus className="h-6 w-6 text-primary-foreground" />
                                        </div>
                                        <span className="text-xs font-semibold mt-4">Create story</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Story Image */}
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    {/* Avatar */}
                                    <div className="absolute top-3 left-3">
                                        <Avatar
                                            className={cn(
                                                "h-10 w-10 ring-4",
                                                story.hasNew ? "ring-primary" : "ring-muted"
                                            )}
                                        >
                                            <AvatarImage
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${story.avatar}`}
                                            />
                                            <AvatarFallback>{story.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    {/* Name */}
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-white text-xs font-semibold truncate">
                                            {story.name}
                                        </p>
                                    </div>
                                </>
                            )}
                        </button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </Card>
    );
}

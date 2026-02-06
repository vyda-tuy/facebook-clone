"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Users,
    UserPlus,
    UserCheck,
    Gift,
    Home,
    Settings,
    ChevronRight,
    List,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const friendRequests = [
    { id: "1", name: "Alex Thompson", avatar: "alex", mutualFriends: 15 },
    { id: "2", name: "Lisa Anderson", avatar: "lisa", mutualFriends: 8 },
    { id: "3", name: "James Wilson", avatar: "james", mutualFriends: 23 },
    { id: "4", name: "Nou Konthy", avatar: "nou", mutualFriends: 7 },
    { id: "5", name: "Meta Khmer", avatar: "meta", mutualFriends: 13 },
    { id: "6", name: "Ham Kung", avatar: "ham", mutualFriends: 21 },
    { id: "7", name: "Sophie Chen", avatar: "sophie", mutualFriends: 6 },
    { id: "8", name: "Marcus Lee", avatar: "marcus", mutualFriends: 10 },
    { id: "9", name: "Jing Pheareak", avatar: "jing", mutualFriends: 11 },
    { id: "10", name: "Sophorn Sam", avatar: "sophorn", mutualFriends: 5 },
];

const suggestions = [
    { id: "s1", name: "Emma Roberts", avatar: "emma", mutualFriends: 12 },
    { id: "s2", name: "Daniel Kim", avatar: "daniel", mutualFriends: 7 },
    { id: "s3", name: "Sophie Chen", avatar: "sophiec", mutualFriends: 19 },
    { id: "s4", name: "Marcus Johnson", avatar: "marcusj", mutualFriends: 5 },
    { id: "s5", name: "Olivia Brown", avatar: "olivia", mutualFriends: 14 },
];

const allFriends = [
    { id: "f1", name: "Sarah Wilson", avatar: "sarah", mutualFriends: 12 },
    { id: "f2", name: "Mike Johnson", avatar: "mike", mutualFriends: 8 },
    { id: "f3", name: "Emily Davis", avatar: "emily", mutualFriends: 15 },
    { id: "f4", name: "Chris Brown", avatar: "chris", mutualFriends: 6 },
];

export default function FriendsPage() {
    const [activeTab, setActiveTab] = useState("home");
    const [requests, setRequests] = useState(friendRequests);

    const handleAccept = (id: string) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
    };

    const handleDecline = (id: string) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
    };

    const navItems = [
        { icon: Home, label: "Home", value: "home", hasArrow: false },
        { icon: UserPlus, label: "Friend Requests", value: "requests", hasArrow: true },
        { icon: Users, label: "Suggestions", value: "suggestions", hasArrow: true },
        { icon: UserCheck, label: "All friends", value: "all", hasArrow: true },
        { icon: Gift, label: "Birthdays", value: "birthdays", hasArrow: true },
        { icon: List, label: "Custom Lists", value: "custom", hasArrow: true },
    ];

    return (
        <div className="flex min-h-[calc(100vh-3.5rem)]">
            {/* Friends Navigation Sidebar - Dark Theme */}
            <aside className="w-[300px] bg-card border-r border-border hidden md:block fixed left-0 top-14 bottom-0">
                <ScrollArea className="h-full">
                    <div className="p-3">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-bold">Friends</h1>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-secondary">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Navigation Items */}
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() => setActiveTab(item.value)}
                                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${activeTab === item.value
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-secondary"
                                        }`}
                                >
                                    <div
                                        className={`h-9 w-9 rounded-full flex items-center justify-center ${activeTab === item.value ? "bg-primary text-primary-foreground" : "bg-secondary"
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                    </div>
                                    <span className="font-medium flex-1 text-left">{item.label}</span>
                                    {item.hasArrow && (
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content - Full Width */}
            <main className="flex-1 md:ml-[300px] p-6 bg-muted min-h-screen">
                {/* Friend Requests Section */}
                {(activeTab === "home" || activeTab === "requests") && (
                    <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Friend Requests</h2>
                            <Link href="#" className="text-primary hover:underline text-sm font-medium">
                                See all
                            </Link>
                        </div>

                        {/* Grid Layout for Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {requests.map((request) => (
                                <Card key={request.id} className="overflow-hidden shadow-sm">
                                    <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 relative">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${request.avatar}`}
                                            alt={request.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-3">
                                        <Link href={`/profile/${request.avatar}`} className="font-semibold hover:underline block text-sm truncate">
                                            {request.name}
                                        </Link>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                                            <div className="flex -space-x-1">
                                                <Avatar className="h-4 w-4 border border-card">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=m1`} />
                                                </Avatar>
                                                <Avatar className="h-4 w-4 border border-card">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=m2`} />
                                                </Avatar>
                                            </div>
                                            <span>{request.mutualFriends} mutual friends</span>
                                        </div>
                                        <div className="space-y-2">
                                            <Button
                                                className="w-full"
                                                size="sm"
                                                onClick={() => handleAccept(request.id)}
                                            >
                                                Confirm
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                className="w-full"
                                                size="sm"
                                                onClick={() => handleDecline(request.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Suggestions Section */}
                {activeTab === "suggestions" && (
                    <section className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">People You May Know</h2>
                            <Link href="#" className="text-primary hover:underline text-sm font-medium">
                                See all
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {suggestions.map((person) => (
                                <Card key={person.id} className="overflow-hidden shadow-sm">
                                    <div className="aspect-square bg-gradient-to-br from-cyan-400 to-blue-500 relative">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.avatar}`}
                                            alt={person.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-3">
                                        <Link href={`/profile/${person.avatar}`} className="font-semibold hover:underline block text-sm truncate">
                                            {person.name}
                                        </Link>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            {person.mutualFriends} mutual friends
                                        </p>
                                        <div className="space-y-2">
                                            <Button className="w-full gap-2" size="sm">
                                                <UserPlus className="h-4 w-4" />
                                                Add Friend
                                            </Button>
                                            <Button variant="secondary" className="w-full" size="sm">
                                                Remove
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Friends Section */}
                {activeTab === "all" && (
                    <section>
                        <h2 className="text-xl font-bold mb-4">All Friends</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {allFriends.map((friend) => (
                                <Card key={friend.id} className="overflow-hidden shadow-sm">
                                    <div className="aspect-square bg-secondary relative">
                                        <img
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.avatar}`}
                                            alt={friend.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <CardContent className="p-3">
                                        <Link href={`/profile/${friend.avatar}`} className="font-semibold hover:underline block text-sm truncate">
                                            {friend.name}
                                        </Link>
                                        <p className="text-xs text-muted-foreground">
                                            {friend.mutualFriends} mutual friends
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Birthdays Section */}
                {activeTab === "birthdays" && (
                    <section>
                        <h2 className="text-xl font-bold mb-4">Upcoming Birthdays</h2>
                        <Card className="shadow-sm">
                            <CardContent className="p-8 text-center text-muted-foreground">
                                No upcoming birthdays this week.
                            </CardContent>
                        </Card>
                    </section>
                )}
            </main>
        </div>
    );
}

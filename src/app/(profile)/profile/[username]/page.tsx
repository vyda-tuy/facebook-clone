"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Camera,
    MapPin,
    GraduationCap,
    MoreHorizontal,
    Plus,
    Pencil,
    ChevronDown,
    Briefcase,
    Home,
    Heart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PostCard, Post } from "@/components/feed/post-card";

// Mock user data
const user = {
    name: "Pichvyda Tuy",
    username: "pichvydatuy",
    avatar: "/avatars/pichvyda.png",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=400&fit=crop",
    bio: "Software Engineer | Tech Enthusiast | Coffee Lover ☕",
    location: "Houston, Texas",
    workplace: "Tech Company Inc.",
    education: "University of Houston",
    school: "Zaman International School",
    relationship: "Single",
    hometown: "New York, NY",
    friends: 707,
    mutualFriends: 23,
};

const photos = [
    "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1682687218147-9806132dc697?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop",
];

const friends = [
    { name: "Sarah Wilson", avatar: "sarah", mutualFriends: 12 },
    { name: "Mike Johnson", avatar: "mike", mutualFriends: 8 },
    { name: "Emily Davis", avatar: "emily", mutualFriends: 15 },
    { name: "Chris Brown", avatar: "chris", mutualFriends: 6 },
    { name: "Jessica Lee", avatar: "jessica", mutualFriends: 20 },
    { name: "David Miller", avatar: "david", mutualFriends: 4 },
    { name: "Amanda White", avatar: "amanda", mutualFriends: 9 },
    { name: "Ryan Garcia", avatar: "ryan", mutualFriends: 11 },
    { name: "Nicole Taylor", avatar: "nicole", mutualFriends: 7 },
];

const userPosts: Post[] = [
    {
        id: "profile-1",
        author: {
            name: user.name,
            username: user.username,
            avatar: user.avatar,
        },
        content: "Just finished a great coding session! 💻 Building something exciting. Stay tuned!",
        createdAt: "1d",
        likes: 89,
        comments: 12,
        shares: 3,
        reactions: { like: 70, love: 15, haha: 4, angry: 0 },
    },
    {
        id: "profile-2",
        author: {
            name: user.name,
            username: user.username,
            avatar: user.avatar,
        },
        content: "Beautiful day for a hike! 🏔️",
        images: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
        ],
        createdAt: "3d",
        likes: 234,
        comments: 45,
        shares: 8,
        reactions: { like: 180, love: 50, haha: 4, angry: 0 },
    },
];

export default function ProfilePage({ params }: { params: { username: string } }) {
    const [activeTab, setActiveTab] = useState("all");
    const isOwnProfile = params.username === "johndoe" || params.username === "pichvydatuy" || params.username === undefined;

    return (
        <div className="-mx-4 -mt-4 bg-muted min-h-screen">
            {/* Cover Photo Container */}
            <div className="max-w-[1100px] mx-auto">
                {/* Cover Photo */}
                <div className="relative h-[200px] sm:h-[300px] lg:h-[380px] rounded-b-lg overflow-hidden bg-gradient-to-r from-pink-400 via-orange-300 to-blue-400">
                    <img
                        src={user.cover}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {isOwnProfile && (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute bottom-4 right-4 gap-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold shadow-md"
                        >
                            <Camera className="h-4 w-4" />
                            Edit cover photo
                        </Button>
                    )}
                </div>

                {/* Profile Info Section */}
                <div className="px-4 lg:px-8 pb-4 bg-card rounded-b-lg shadow-sm relative">
                    {/* Avatar positioned to overlap cover */}
                    <div className="flex flex-col sm:flex-row sm:items-end">
                        {/* Avatar */}
                        <div className="relative -mt-[85px] sm:-mt-[40px] z-10 self-center sm:self-auto">
                            <Avatar className="h-[168px] w-[168px] border-4 border-card bg-card shadow-lg">
                                <AvatarImage src={user.avatar} className="object-cover" />
                                <AvatarFallback className="text-5xl bg-secondary">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            {isOwnProfile && (
                                <Button
                                    size="icon"
                                    className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-secondary hover:bg-secondary/80 border-0 shadow-md"
                                >
                                    <Camera className="h-5 w-5 text-foreground" />
                                </Button>
                            )}
                        </div>

                        {/* Name, Friends & Info */}
                        <div className="flex-1 sm:ml-4 mt-4 sm:mt-0 sm:pb-4 text-center sm:text-left">
                            <h1 className="text-[32px] font-bold text-foreground leading-tight">
                                {user.name}
                            </h1>
                            <p className="text-muted-foreground font-medium">
                                {user.friends.toLocaleString()} friends
                            </p>
                            {/* User Info Icons */}
                            <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 flex-wrap">
                                <div className="flex items-center gap-1 text-muted-foreground text-[15px]">
                                    <MapPin className="h-4 w-4" />
                                    <span>{user.location}</span>
                                </div>
                                <span className="text-muted-foreground mx-1">·</span>
                                <div className="flex items-center gap-1 text-muted-foreground text-[15px]">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{user.education}</span>
                                </div>
                                <span className="text-muted-foreground mx-1">·</span>
                                <div className="flex items-center gap-1 text-muted-foreground text-[15px]">
                                    <GraduationCap className="h-4 w-4" />
                                    <span>{user.school}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 justify-center sm:justify-end mt-4 sm:mt-0 sm:pb-4">
                            {isOwnProfile ? (
                                <>
                                    <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4">
                                        <Plus className="h-4 w-4" />
                                        Add to story
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="gap-2 font-semibold px-4"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Edit profile
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                    >
                                        <ChevronDown className="h-5 w-5" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4">
                                        <Plus className="h-4 w-4" />
                                        Add Friend
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="gap-2 font-semibold px-4"
                                    >
                                        Message
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <Separator className="mt-4" />

                    {/* Tab Navigation */}
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                            {["All", "About", "Friends", "Photos", "Reels", "More"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-4 py-4 font-semibold text-[15px] transition-colors relative ${activeTab === tab.toLowerCase()
                                            ? "text-primary"
                                            : "text-muted-foreground hover:bg-secondary rounded-lg"
                                        }`}
                                >
                                    {tab === "More" ? (
                                        <span className="flex items-center gap-1">
                                            {tab}
                                            <ChevronDown className="h-4 w-4" />
                                        </span>
                                    ) : (
                                        tab
                                    )}
                                    {activeTab === tab.toLowerCase() && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-t-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                        >
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="mt-4 px-4 lg:px-0">
                    {activeTab === "all" && (
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                            {/* Left Column - Info */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Intro Card */}
                                <Card className="shadow-sm">
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-xl mb-4">Intro</h3>
                                        <p className="text-center text-muted-foreground mb-4">{user.bio}</p>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Briefcase className="h-5 w-5" />
                                                <span>Works at <span className="font-semibold text-foreground">{user.workplace}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-5 w-5" />
                                                <span>Studied at <span className="font-semibold text-foreground">{user.education}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Home className="h-5 w-5" />
                                                <span>Lives in <span className="font-semibold text-foreground">{user.location}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-5 w-5" />
                                                <span>From <span className="font-semibold text-foreground">{user.hometown}</span></span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Heart className="h-5 w-5" />
                                                <span>{user.relationship}</span>
                                            </div>
                                        </div>

                                        {isOwnProfile && (
                                            <Button
                                                variant="secondary"
                                                className="w-full mt-4 font-semibold"
                                            >
                                                Edit details
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Photos Card */}
                                <Card className="shadow-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-xl">Photos</h3>
                                            <Link href={`/profile/${user.username}/photos`} className="text-primary text-[15px] hover:underline">
                                                See all photos
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                                            {photos.map((photo, i) => (
                                                <img
                                                    key={i}
                                                    src={photo}
                                                    alt={`Photo ${i + 1}`}
                                                    className="aspect-square object-cover hover:brightness-90 transition-all cursor-pointer"
                                                />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Friends Card */}
                                <Card className="shadow-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="font-bold text-xl">Friends</h3>
                                                <p className="text-muted-foreground text-[15px]">{user.friends.toLocaleString()} friends</p>
                                            </div>
                                            <Link href={`/profile/${user.username}/friends`} className="text-primary text-[15px] hover:underline">
                                                See all friends
                                            </Link>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {friends.slice(0, 9).map((friend) => (
                                                <Link
                                                    key={friend.name}
                                                    href={`/profile/${friend.avatar}`}
                                                    className="text-center group"
                                                >
                                                    <div className="aspect-square rounded-lg overflow-hidden mb-1">
                                                        <img
                                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.avatar}`}
                                                            alt={friend.name}
                                                            className="w-full h-full object-cover bg-secondary group-hover:brightness-90 transition-all"
                                                        />
                                                    </div>
                                                    <p className="text-xs font-medium truncate group-hover:underline">
                                                        {friend.name}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Posts */}
                            <div className="lg:col-span-3">
                                {userPosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "about" && (
                        <Card className="shadow-sm">
                            <CardContent className="p-8 text-center text-muted-foreground">
                                About section coming soon...
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "friends" && (
                        <Card className="shadow-sm">
                            <CardContent className="p-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {friends.map((friend) => (
                                        <Card key={friend.name} className="overflow-hidden shadow-sm">
                                            <div className="flex gap-3 p-3">
                                                <Avatar className="h-20 w-20 rounded-lg">
                                                    <AvatarImage
                                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend.avatar}`}
                                                    />
                                                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/profile/${friend.avatar}`} className="font-semibold hover:underline truncate block">
                                                        {friend.name}
                                                    </Link>
                                                    <p className="text-xs text-muted-foreground">
                                                        {friend.mutualFriends} mutual friends
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "photos" && (
                        <Card className="shadow-sm">
                            <CardContent className="p-4">
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                    {photos.concat(photos).map((photo, i) => (
                                        <img
                                            key={i}
                                            src={photo}
                                            alt={`Photo ${i + 1}`}
                                            className="aspect-square object-cover rounded-lg hover:brightness-90 transition-all cursor-pointer"
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

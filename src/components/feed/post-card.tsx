"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ThumbsUp,
    MessageCircle,
    Share2,
    MoreHorizontal,
    Globe,
    X,
    Heart,
    Laugh,
    Angry,
    Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface Post {
    id: string;
    author: {
        name: string;
        username: string;
        avatar: string;
    };
    content: string;
    images?: string[];
    createdAt: string;
    likes: number;
    comments: number;
    shares: number;
    isLiked?: boolean;
    reactions?: {
        like: number;
        love: number;
        haha: number;
        angry: number;
    };
}

interface PostCardProps {
    post: Post;
    onLike?: (postId: string) => void;
    onComment?: (postId: string, comment: string) => void;
}

const reactions = [
    { icon: ThumbsUp, label: "Like", color: "text-blue-500", bg: "bg-blue-500" },
    { icon: Heart, label: "Love", color: "text-red-500", bg: "bg-red-500" },
    { icon: Laugh, label: "Haha", color: "text-yellow-500", bg: "bg-yellow-500" },
    { icon: Angry, label: "Angry", color: "text-orange-500", bg: "bg-orange-500" },
];

export function PostCard({ post, onLike, onComment }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(post.isLiked || false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const [showReactions, setShowReactions] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        onLike?.(post.id);
    };

    const handleComment = () => {
        if (comment.trim()) {
            onComment?.(post.id, comment);
            setComment("");
        }
    };

    const formatCount = (count: number) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count.toString();
    };

    return (
        <Card className="mb-4 shadow-sm overflow-hidden">
            <CardContent className="p-0">
                {/* Header */}
                <div className="p-4 pb-3">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                            <Link href={`/profile/${post.author.username}`}>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={post.author.avatar} />
                                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <Link
                                    href={`/profile/${post.author.username}`}
                                    className="font-semibold hover:underline"
                                >
                                    {post.author.name}
                                </Link>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span>{post.createdAt}</span>
                                    <span>·</span>
                                    <Globe className="h-3 w-3" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Save post</DropdownMenuItem>
                                    <DropdownMenuItem>Hide post</DropdownMenuItem>
                                    <DropdownMenuItem>Snooze for 30 days</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Content */}
                    {post.content && (
                        <p className="mt-3 text-[15px] leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </p>
                    )}
                </div>

                {/* Images */}
                {post.images && post.images.length > 0 && (
                    <div
                        className={cn(
                            "grid",
                            post.images.length === 1 && "grid-cols-1",
                            post.images.length === 2 && "grid-cols-2",
                            post.images.length >= 3 && "grid-cols-2"
                        )}
                    >
                        {post.images.slice(0, 4).map((image, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative bg-muted",
                                    post.images!.length === 1 && "aspect-video",
                                    post.images!.length === 2 && "aspect-square",
                                    post.images!.length >= 3 && "aspect-square",
                                    post.images!.length === 3 && index === 0 && "row-span-2",
                                    post.images!.length > 4 && index === 3 && "relative"
                                )}
                            >
                                <img
                                    src={image}
                                    alt={`Post image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                {post.images!.length > 4 && index === 3 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="text-white text-3xl font-bold">
                                            +{post.images!.length - 4}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                <div className="px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                            <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                <ThumbsUp className="h-3 w-3 text-white" />
                            </div>
                            {post.reactions && post.reactions.love > 0 && (
                                <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                                    <Heart className="h-3 w-3 text-white" />
                                </div>
                            )}
                        </div>
                        <span className="ml-1">{formatCount(likeCount)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="hover:underline"
                            onClick={() => setShowComments(!showComments)}
                        >
                            {formatCount(post.comments)} comments
                        </button>
                        <span>{formatCount(post.shares)} shares</span>
                    </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="p-1 flex items-center">
                    <TooltipProvider>
                        <div
                            className="relative flex-1"
                            onMouseEnter={() => setShowReactions(true)}
                            onMouseLeave={() => setShowReactions(false)}
                        >
                            <Button
                                variant="ghost"
                                className={cn(
                                    "flex-1 w-full gap-2",
                                    isLiked && "text-blue-500"
                                )}
                                onClick={handleLike}
                            >
                                <ThumbsUp
                                    className={cn("h-5 w-5", isLiked && "fill-current")}
                                />
                                <span className="font-medium">Like</span>
                            </Button>

                            {/* Reaction Picker */}
                            {showReactions && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-card rounded-full shadow-lg border p-1 flex gap-1 animate-in fade-in zoom-in-95 duration-200">
                                    {reactions.map((reaction) => (
                                        <Tooltip key={reaction.label}>
                                            <TooltipTrigger asChild>
                                                <button
                                                    className={cn(
                                                        "h-10 w-10 rounded-full flex items-center justify-center transition-transform hover:scale-125",
                                                        reaction.bg
                                                    )}
                                                    onClick={() => {
                                                        handleLike();
                                                        setShowReactions(false);
                                                    }}
                                                >
                                                    <reaction.icon className="h-5 w-5 text-white" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{reaction.label}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TooltipProvider>

                    <Button
                        variant="ghost"
                        className="flex-1 gap-2"
                        onClick={() => setShowComments(!showComments)}
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">Comment</span>
                    </Button>

                    <Button variant="ghost" className="flex-1 gap-2">
                        <Share2 className="h-5 w-5" />
                        <span className="font-medium">Share</span>
                    </Button>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <>
                        <Separator />
                        <div className="p-4 pt-3">
                            {/* Comment Input */}
                            <div className="flex gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/pichvyda.png" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 relative">
                                    <Input
                                        placeholder="Write a comment..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleComment()}
                                        className="rounded-full bg-secondary border-0 pr-10"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
                                        onClick={handleComment}
                                        disabled={!comment.trim()}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Sample Comments */}
                            <div className="mt-4 space-y-3">
                                <div className="flex gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" />
                                        <AvatarFallback>SW</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="bg-secondary rounded-2xl px-3 py-2">
                                            <Link href="/profile/sarah" className="font-semibold text-sm hover:underline">
                                                Sarah Wilson
                                            </Link>
                                            <p className="text-sm">This is amazing! 🔥</p>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 ml-3 text-xs text-muted-foreground">
                                            <button className="font-semibold hover:underline">Like</button>
                                            <button className="font-semibold hover:underline">Reply</button>
                                            <span>2h</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

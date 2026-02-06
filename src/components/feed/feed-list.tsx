"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PostCard, Post } from "./post-card";
import { PostCreate } from "./post-create";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for demonstration
const mockPosts: Post[] = [
    {
        id: "1",
        author: {
            name: "Sarah Wilson",
            username: "sarahwilson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        },
        content:
            "Just finished building my first React app! 🚀 The journey of learning web development has been incredible. Can't wait to share more projects with you all!",
        images: [
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
        ],
        createdAt: "2h",
        likes: 124,
        comments: 28,
        shares: 5,
        reactions: { like: 100, love: 20, haha: 4, angry: 0 },
    },
    {
        id: "2",
        author: {
            name: "Mike Johnson",
            username: "mikejohnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        },
        content:
            "Beautiful sunset at the beach today! 🌅 Nature never fails to amaze me. Taking a moment to appreciate the little things in life.",
        images: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop",
        ],
        createdAt: "4h",
        likes: 256,
        comments: 42,
        shares: 12,
        reactions: { like: 180, love: 70, haha: 6, angry: 0 },
    },
    {
        id: "3",
        author: {
            name: "Emily Davis",
            username: "emilydavis",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
        },
        content:
            "🎉 Exciting news! I just got promoted to Senior Software Engineer! Hard work and dedication really do pay off. Thank you to everyone who supported me on this journey! 💪\n\n#CareerGrowth #SoftwareEngineering #Grateful",
        createdAt: "6h",
        likes: 892,
        comments: 156,
        shares: 23,
        reactions: { like: 600, love: 280, haha: 12, angry: 0 },
    },
    {
        id: "4",
        author: {
            name: "Chris Brown",
            username: "chrisbrown",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chris",
        },
        content:
            "Made some homemade pasta today! 🍝 First time trying this recipe and it turned out amazing. Drop a 👨‍🍳 if you want the recipe!",
        images: [
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&h=600&fit=crop",
        ],
        createdAt: "8h",
        likes: 445,
        comments: 89,
        shares: 34,
        reactions: { like: 300, love: 130, haha: 15, angry: 0 },
    },
    {
        id: "5",
        author: {
            name: "Jessica Lee",
            username: "jessicalee",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
        },
        content:
            "Just adopted this little guy from the shelter! 🐕 Meet Max, my new best friend. He's already made himself at home. Any tips for first-time dog owners?",
        images: [
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",
        ],
        createdAt: "12h",
        likes: 1247,
        comments: 234,
        shares: 56,
        isLiked: true,
        reactions: { like: 800, love: 420, haha: 27, angry: 0 },
    },
];

function PostSkeleton() {
    return (
        <Card className="mb-4">
            <CardContent className="p-4">
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
                <Skeleton className="h-20 w-full mt-4" />
                <Skeleton className="h-48 w-full mt-4 rounded-lg" />
                <div className="flex justify-between mt-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </CardContent>
        </Card>
    );
}

export function FeedList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const loaderRef = useRef<HTMLDivElement>(null);

    const loadPosts = useCallback(async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (page === 1) {
            setPosts(mockPosts);
        } else if (page <= 3) {
            // Add more posts for infinite scroll demo
            const morePosts = mockPosts.map((post) => ({
                ...post,
                id: `${post.id}-page${page}`,
                createdAt: `${parseInt(post.createdAt) + page * 12}h`,
            }));
            setPosts((prev) => [...prev, ...morePosts]);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    }, [page]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [hasMore, isLoading]);

    const handleNewPost = (content: string, images: string[]) => {
        const newPost: Post = {
            id: `new-${Date.now()}`,
            author: {
                name: "Pichvyda Tuy",
                username: "pichvydatuy",
                avatar: "/avatars/pichvyda.png",
            },
            content,
            images: images.length > 0 ? images : undefined,
            createdAt: "Just now",
            likes: 0,
            comments: 0,
            shares: 0,
            reactions: { like: 0, love: 0, haha: 0, angry: 0 },
        };
        setPosts((prev) => [newPost, ...prev]);
    };

    const handleLike = (postId: string) => {
        // In a real app, this would call an API
        console.log("Liked post:", postId);
    };

    const handleComment = (postId: string, comment: string) => {
        // In a real app, this would call an API
        console.log("Comment on post:", postId, comment);
    };

    return (
        <div className="max-w-[680px] mx-auto">
            <PostCreate onPost={handleNewPost} />

            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                />
            ))}

            {/* Loading / Infinite scroll trigger */}
            <div ref={loaderRef}>
                {isLoading && (
                    <>
                        <PostSkeleton />
                        <PostSkeleton />
                    </>
                )}
                {!hasMore && (
                    <p className="text-center text-muted-foreground py-8">
                        You&apos;ve reached the end of your feed!
                    </p>
                )}
            </div>
        </div>
    );
}

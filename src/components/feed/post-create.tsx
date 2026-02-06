"use client";

import { useState, useRef } from "react";
import { Image, Video, Smile, MapPin, Users, MoreHorizontal, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const actionButtons = [
    { icon: Video, label: "Live video", color: "text-red-500" },
    { icon: Image, label: "Photo/video", color: "text-green-500" },
    { icon: Smile, label: "Feeling/activity", color: "text-yellow-500" },
];

interface PostCreateProps {
    onPost?: (content: string, images: string[]) => void;
}

export function PostCreate({ onPost }: PostCreateProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [isPosting, setIsPosting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result) {
                        setImages((prev) => [...prev, e.target!.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handlePost = async () => {
        if (!content.trim() && images.length === 0) return;

        setIsPosting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onPost?.(content, images);
        setContent("");
        setImages([]);
        setIsOpen(false);
        setIsPosting(false);
    };

    return (
        <Card className="mb-4 shadow-sm">
            <CardContent className="p-4">
                <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatars/pichvyda.png" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <button className="flex-1 bg-secondary hover:bg-secondary/80 rounded-full px-4 py-2.5 text-left text-muted-foreground transition-colors">
                                What&apos;s on your mind, Pichvyda?
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] p-0">
                            <DialogHeader className="p-4 pb-0">
                                <DialogTitle className="text-center text-xl font-bold">
                                    Create post
                                </DialogTitle>
                            </DialogHeader>
                            <Separator />

                            <div className="p-4">
                                {/* User Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/avatars/pichvyda.png" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">Pichvyda Tuy</p>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-6 px-2 text-xs"
                                        >
                                            <Users className="h-3 w-3 mr-1" />
                                            Friends
                                        </Button>
                                    </div>
                                </div>

                                {/* Text Input */}
                                <Textarea
                                    placeholder="What's on your mind, Pichvyda?"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="min-h-[120px] border-0 resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0"
                                />

                                {/* Selected Images */}
                                {images.length > 0 && (
                                    <div className="mt-4 border rounded-lg p-2">
                                        <div
                                            className={cn(
                                                "grid gap-2",
                                                images.length === 1 && "grid-cols-1",
                                                images.length === 2 && "grid-cols-2",
                                                images.length >= 3 && "grid-cols-2"
                                            )}
                                        >
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={cn(
                                                        "relative rounded-lg overflow-hidden",
                                                        images.length === 1 && "aspect-video",
                                                        images.length >= 2 && "aspect-square",
                                                        images.length === 3 && index === 0 && "row-span-2"
                                                    )}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Upload ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Add to post */}
                                <div className="mt-4 border rounded-lg p-3 flex items-center justify-between">
                                    <span className="font-semibold text-sm">Add to your post</span>
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageSelect}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 rounded-full"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Image className="h-5 w-5 text-green-500" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 rounded-full"
                                        >
                                            <Users className="h-5 w-5 text-blue-500" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 rounded-full"
                                        >
                                            <Smile className="h-5 w-5 text-yellow-500" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 rounded-full"
                                        >
                                            <MapPin className="h-5 w-5 text-red-500" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-9 w-9 rounded-full"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Post Button */}
                                <Button
                                    className="w-full mt-4"
                                    disabled={!content.trim() && images.length === 0}
                                    onClick={handlePost}
                                >
                                    {isPosting ? "Posting..." : "Post"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Separator className="my-3" />

                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                    {actionButtons.map((action) => (
                        <Button
                            key={action.label}
                            variant="ghost"
                            className="flex-1 gap-2 h-10"
                            onClick={() => setIsOpen(true)}
                        >
                            <action.icon className={cn("h-5 w-5", action.color)} />
                            <span className="hidden sm:inline text-muted-foreground font-medium">
                                {action.label}
                            </span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

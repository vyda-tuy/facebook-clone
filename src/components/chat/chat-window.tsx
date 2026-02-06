"use client";

import { useState, useRef, useEffect } from "react";
import { X, Minus, Phone, Video, Image, Smile, ThumbsUp, Mic, Send, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    content: string;
    sender: "user" | "other";
    timestamp: string;
    type?: "text" | "call" | "date";
}

interface ChatWindowProps {
    contact: {
        name: string;
        avatar: string;
        online?: boolean;
    };
    onClose: () => void;
    onMinimize: () => void;
    isMinimized: boolean;
}

const mockMessages: Message[] = [
    { id: "1", content: "Hey! How are you doing?", sender: "other", timestamp: "2:30 PM" },
    { id: "2", content: "I'm good! Just working on some projects. You?", sender: "user", timestamp: "2:32 PM" },
    { id: "3", content: "Same here! Been busy with work lately 😅", sender: "other", timestamp: "2:33 PM" },
    { id: "4", content: "3/22/24, 2:33 PM", sender: "other", timestamp: "", type: "date" },
    { id: "5", content: "We should catch up sometime soon!", sender: "other", timestamp: "3:15 PM" },
    { id: "6", content: "Definitely! Are you free this weekend?", sender: "user", timestamp: "3:20 PM" },
    { id: "7", content: "Yes! Let's grab coffee ☕", sender: "other", timestamp: "3:22 PM" },
    { id: "8", content: "Sounds perfect! Saturday at 2pm?", sender: "user", timestamp: "3:25 PM" },
    { id: "9", content: "3/24/24, 3:25 PM", sender: "other", timestamp: "", type: "date" },
    { id: "10", content: "Works for me! See you then 🎉", sender: "other", timestamp: "3:30 PM" },
];

export function ChatWindow({ contact, onClose, onMinimize, isMinimized }: ChatWindowProps) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [isFocused, setIsFocused] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const isInputActive = isFocused || message.trim().length > 0;

    const handleSend = () => {
        if (message.trim()) {
            const userMsgContent = message; // Capture for response logic
            const newMessage: Message = {
                id: `msg-${Date.now()}`,
                content: userMsgContent,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, newMessage]);
            setMessage("");

            // Simulate "other user" response
            setTimeout(() => {
                let responseText = "That's interesting! Tell me more.";
                const lowerMsg = userMsgContent.toLowerCase();

                if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
                    responseText = "Hey! How's it going? 👋";
                } else if (lowerMsg.includes("how are you")) {
                    responseText = "I'm doing great, thanks for asking! How about you?";
                } else if (lowerMsg.includes("good") || lowerMsg.includes("fine") || lowerMsg.includes("great")) {
                    responseText = "Glad to hear that! 😊";
                } else if (lowerMsg.includes("coffee")) {
                    responseText = "Coffee sounds amazing! When and where? ☕";
                } else if (lowerMsg.includes("weekend") || lowerMsg.includes("plans")) {
                    responseText = "No big plans yet, just relaxing. You?";
                } else if (lowerMsg.includes("busy") || lowerMsg.includes("work")) {
                    responseText = "Don't work too hard! 💼";
                } else if (lowerMsg.includes("bye") || lowerMsg.includes("see you")) {
                    responseText = "See you later! 👋";
                } else if (lowerMsg.includes("lol") || lowerMsg.includes("haha")) {
                    responseText = "😂";
                }

                const responseMsg: Message = {
                    id: `msg-${Date.now() + 1}`,
                    content: responseText,
                    sender: "other",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages((prev) => [...prev, responseMsg]);
            }, 1000 + Math.random() * 2000); // 1-3 second random delay
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (isMinimized) {
        return (
            <button
                onClick={onMinimize}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 rounded-t-lg px-3 py-2 shadow-lg border border-gray-200"
            >
                <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}`} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-gray-900 text-sm font-medium">{contact.name}</span>
                {contact.online && (
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                )}
            </button>
        );
    }

    return (
        <div className="w-[328px] bg-white rounded-t-lg shadow-2xl flex flex-col overflow-hidden border border-gray-300">
            {/* Header */}
            <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}`} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                        )}
                    </div>
                    <div>
                        <p className="text-gray-900 text-sm font-semibold flex items-center gap-1">
                            {contact.name}
                            <svg className="h-3 w-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0084ff] hover:bg-gray-100">
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0084ff] hover:bg-gray-100">
                        <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100" onClick={onMinimize}>
                        <Minus className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:bg-gray-100" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </div>



            {/* Messages */}
            <ScrollArea className="h-[320px] p-3 bg-white">
                <div className="space-y-3">
                    {messages.map((msg) => (
                        <div key={msg.id}>
                            {msg.type === "date" ? (
                                <p className="text-gray-500 text-xs text-center py-2">{msg.content}</p>
                            ) : msg.type === "call" ? (
                                <div className="flex items-center gap-2 justify-center">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="h-4 w-4 text-[#0084ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 5v14M5 12l7 7 7-7" />
                                            </svg>
                                        </div>
                                        <div className="bg-gray-100 rounded-2xl px-4 py-2 flex items-center gap-3">
                                            <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-900 text-sm font-medium">{msg.content}</p>
                                                <p className="text-gray-500 text-xs">{msg.timestamp}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={cn(
                                    "flex",
                                    msg.sender === "user" ? "justify-end" : "justify-start"
                                )}>
                                    {msg.sender === "other" && (
                                        <Avatar className="h-7 w-7 mr-2 flex-shrink-0">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}`} />
                                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "max-w-[70%] rounded-2xl px-3 py-2",
                                        msg.sender === "user"
                                            ? "bg-gradient-to-r from-[#9f2bc4] to-[#a855f7] text-white"
                                            : "bg-gray-100 text-gray-900"
                                    )}>
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input Area - matches Facebook Messenger exactly */}
            <div className="px-2 py-2 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2"> {/* Changed gap-0.5 to gap-2 */}
                    {isInputActive ? (
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-[#0084ff] hover:bg-gray-100 flex-shrink-0">
                            <PlusCircle className="h-6 w-6" />
                        </Button>
                    ) : (
                        <div className="flex items-center gap-0.5">
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#0084ff] hover:bg-gray-100 flex-shrink-0">
                                <Mic className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#0084ff] hover:bg-gray-100 flex-shrink-0">
                                <Image className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#0084ff] hover:bg-gray-100 flex-shrink-0">
                                <Smile className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#0084ff] hover:bg-gray-100 flex-shrink-0">
                                <span className="text-sm font-bold">GIF</span>
                            </Button>
                        </div>
                    )}

                    <div className="flex-1 relative"> {/* Removed mx-1 */}
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyPress={handleKeyPress}
                            placeholder="Aa"
                            className="bg-gray-100 border-0 rounded-full text-gray-900 placeholder:text-gray-500 pr-10 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-[#0084ff] hover:bg-transparent"
                        >
                            <Smile className="h-5 w-5" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-[#0084ff] hover:bg-gray-100 flex-shrink-0"
                        onClick={handleSend}
                    >
                        {message ? <Send className="h-6 w-6" /> : <ThumbsUp className="h-6 w-6" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}


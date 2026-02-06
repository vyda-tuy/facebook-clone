"use client";

import { useState } from "react";
import { ChatWindow } from "./chat-window";

interface Contact {
    name: string;
    avatar: string;
    online?: boolean;
}

interface ChatState {
    contact: Contact;
    isMinimized: boolean;
}

// Global state for chat windows (we'll use this across components)
let chatListeners: ((chats: ChatState[]) => void)[] = [];
let currentChats: ChatState[] = [];

export function openChat(contact: Contact) {
    // Check if chat already exists
    const existingIndex = currentChats.findIndex(c => c.contact.name === contact.name);
    if (existingIndex >= 0) {
        // Restore if minimized
        currentChats[existingIndex].isMinimized = false;
        currentChats = [...currentChats];
    } else {
        // Add new chat (max 3 windows)
        if (currentChats.length >= 3) {
            currentChats = currentChats.slice(1);
        }
        currentChats = [...currentChats, { contact, isMinimized: false }];
    }
    chatListeners.forEach(listener => listener(currentChats));
}

export function ChatManager() {
    const [chats, setChats] = useState<ChatState[]>([]);

    // Subscribe to chat updates
    useState(() => {
        chatListeners.push(setChats);
        return () => {
            chatListeners = chatListeners.filter(l => l !== setChats);
        };
    });

    const handleClose = (contactName: string) => {
        currentChats = currentChats.filter(c => c.contact.name !== contactName);
        chatListeners.forEach(listener => listener(currentChats));
    };

    const handleMinimize = (contactName: string) => {
        currentChats = currentChats.map(c =>
            c.contact.name === contactName
                ? { ...c, isMinimized: !c.isMinimized }
                : c
        );
        chatListeners.forEach(listener => listener(currentChats));
    };

    return (
        <div className="fixed bottom-0 right-20 flex items-end gap-2 z-50">
            {chats.map((chat) => (
                <ChatWindow
                    key={chat.contact.name}
                    contact={chat.contact}
                    isMinimized={chat.isMinimized}
                    onClose={() => handleClose(chat.contact.name)}
                    onMinimize={() => handleMinimize(chat.contact.name)}
                />
            ))}
        </div>
    );
}

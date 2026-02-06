import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ChatManager } from "@/components/chat/chat-manager";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Sidebar />
            <main className="pt-14 pb-14 md:pb-0 lg:pl-[280px] xl:pr-[280px]">
                <div className="p-4">{children}</div>
            </main>
            <RightSidebar />
            <MobileNav />
            <ChatManager />
        </div>
    );
}

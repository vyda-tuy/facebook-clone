import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function FriendsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-14 pb-14 md:pb-0">
                {children}
            </main>
            <MobileNav />
        </div>
    );
}

import { FeedList } from "@/components/feed/feed-list";
import { Stories } from "@/components/feed/stories";

export default function HomePage() {
    return (
        <>
            <Stories />
            <FeedList />
        </>
    );
}

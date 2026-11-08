import { socialFeed } from "@/lib/socialFeed";

/** Make'in izlediği linkedin paylaşım akışı (bkz. docs/sosyal-medya.md); derlemede statik üretilir. */
export const dynamic = "force-static";

export function GET() {
    return socialFeed("linkedin");
}

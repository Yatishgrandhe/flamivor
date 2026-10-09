"use client";
import { Printer, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export function ArticleActions({ slug }: { slug: string }) {
  return (
    <div className="article-actions">
      <Button variant="outline" onClick={() => window.print()}>
        <Printer size={16} />
        Print guide
      </Button>
      <Button asChild variant="ghost">
        <Link href={`/dashboard?save=${encodeURIComponent(slug)}`}>
          <Bookmark size={16} />
          Save to member space
        </Link>
      </Button>
    </div>
  );
}

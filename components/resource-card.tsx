import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { resources } from "@/lib/resources";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import "./resource-card.css";

export function ResourceArt({ symbol }: { symbol: string }) {
  return (
    <svg viewBox="0 0 280 180" fill="none" aria-hidden="true">
      {symbol === "bridge" ? (
        <g stroke="currentColor" strokeWidth="3">
          <path d="M20 135H260M35 135V70L140 30L245 70V135M35 70H245M35 70L85 135L140 30L195 135L245 70M85 135H195" />
          <path d="M20 148H65M215 148H260M140 30V135" strokeWidth="1" />
        </g>
      ) : symbol === "rays" ? (
        <g stroke="currentColor" strokeWidth="3">
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d="M140 18V53"
              transform={`rotate(${i * 30} 140 90)`}
            />
          ))}
          <circle cx="140" cy="90" r="19" />
        </g>
      ) : (
        <g stroke="currentColor" strokeWidth="3">
          <circle cx="107" cy="90" r="60" />
          <circle cx="173" cy="90" r="60" />
          <path d="M140 40V140M128 49V131M152 49V131" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}
export function ResourceCard({
  resource,
}: {
  resource: (typeof resources)[number];
}) {
  return (
    <Link href={`/resources/${resource.slug}`} className="resource-card-link">
      <Card className="resource-card">
        <div className={`resource-cover ${resource.color}`} aria-hidden="true">
          <span className="cover-label">THE CHARLOTTE FIELD NOTES</span>
          <ResourceArt symbol={resource.symbol} />
          <span className="cover-bottom">
            A SMALL START GOES A LONG WAY <ArrowUpRight size={17} />
          </span>
        </div>
        <CardHeader className="resource-copy">
          <div className="resource-meta">
            <span>{resource.category}</span>
            <span>{resource.time}</span>
          </div>
          <CardTitle><h3>
            {resource.title}
            <ArrowUpRight size={21} aria-hidden="true" />
          </h3></CardTitle>
          <CardDescription><p>{resource.description}</p></CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

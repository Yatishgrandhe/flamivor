import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, TextLink } from "@/components/editorial";
import { ResourceArt } from "@/components/resource-card";
import { ArticleActions } from "@/components/article-actions";
import { resources } from "@/lib/resources";
export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  return {
    title: resource?.title || "Resource not found",
    description: resource?.description,
  };
}
export default async function Resource({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);
  if (!resource) notFound();
  return (
    <main id="main">
      <PageHeader
        eyebrow={`${resource.category} / ${resource.time}`}
        title={resource.title}
        description={resource.description}
      />
      <div className="article-layout shell">
        <aside className="article-aside">
          <div className={`resource-cover ${resource.color}`}>
            <span className="cover-label">THE CHARLOTTE FIELD NOTES</span>
            <ResourceArt symbol={resource.symbol} />
            <span className="cover-bottom">CURIOSITY BELONGS HERE.</span>
          </div>
          <p className="article-meta">
            An original Flamivor Charlotte starter guide.
          </p>
          <TextLink href="/resources">All field notes</TextLink>
        </aside>
        <article className="article-body">
          <ArticleActions slug={resource.slug} />
          {resource.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <p className="print-note">
            Flamivor Charlotte • Free educational starter guide •
            flamivor-charlotte.vercel.app
          </p>
        </article>
      </div>
    </main>
  );
}

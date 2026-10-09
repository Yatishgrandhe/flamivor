import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial";
import { ResourceBrowser } from "@/components/resource-browser";
export const metadata: Metadata = { title: "Free learning resources" };
export default function Resources() {
  return (
    <main id="main">
      <PageHeader
        title={
          <>
            Small starts.
            <br />
            <em>Brighter</em> minds.
          </>
        }
        description="An experiment to try. A new study habit. A better way to support a peer. Explore our original starter guides, no account needed."
      />
      <section className="resource-listing shell">
        <h2 className="sr-only">Browse the field notes</h2>
        <ResourceBrowser />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial";
import { leaders } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chapter team",
  description:
    "Meet the student leaders of Flamivor Charlotte, including Treasurer Supreeth Annand.",
};

export default function Team() {
  return (
    <main id="main">
      <PageHeader
        title={
          <>
            Students at the table.
          </>
        }
        description="Meet the young people helping shape Flamivor Charlotte. Each role brings a different part of the chapter’s work together."
      />

      <section className="editorial-section shell" aria-labelledby="team-heading">
        <div className="section-intro">
          <h2 id="team-heading">The people behind the work.</h2>
          <p className="chapter-note">
            Flamivor Charlotte is youth-led, with space for more students to
            contribute as the chapter grows.
          </p>
        </div>

        <div className="team-grid">
          {leaders.map((leader) => (
            <article className="leader-card editorial-row" key={leader.name}>
              <span className="leader-monogram" aria-hidden="true">
                {leader.initials}
              </span>
              <div>
                <h3>{leader.name}</h3>
                <p>{leader.role}</p>
              </div>
            </article>
          ))}
        </div>

      </section>
    </main>
  );
}

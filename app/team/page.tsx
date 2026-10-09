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
        eyebrow="THE CHARLOTTE CHAPTER / LEADERSHIP"
        title={
          <>
            STUDENTS
            <br />
            AT THE TABLE.
          </>
        }
        description="Meet the young people helping shape Flamivor Charlotte. Each role brings a different part of the chapter’s work together."
      />

      <section className="editorial-section shell" aria-labelledby="team-heading">
        <div className="section-intro">
          <p className="eyebrow">CHAPTER LEADERSHIP</p>
          <h2 id="team-heading">The people behind the work.</h2>
          <p className="chapter-note">
            Flamivor Charlotte is youth-led, with space for more students to
            contribute as the chapter grows.
          </p>
        </div>

        <div className="team-grid">
          {leaders.map((leader, index) => (
            <article className="leader-card editorial-row" key={leader.name}>
              <span className="row-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
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

import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leaders } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chapter team",
  description:
    "Meet the student leaders of Flamivor Charlotte, including Treasurer Supreeth Annand.",
};

export default function Team() {
  return (
    <main id="main" className="public-site secondary-page secondary-team">
      <section className="secondary-hero secondary-shell" aria-labelledby="team-title">
        <div className="secondary-hero-copy">
          <h1 id="team-title">Students at the table.</h1>
        </div>
        <div className="secondary-hero-aside">
          <p>
            Meet the young people helping shape Flamivor Charlotte. Each role
            brings a different part of the chapter’s work together.
          </p>
        </div>
      </section>

      <section className="secondary-section secondary-shell secondary-roster" aria-labelledby="roster-heading">
        <div className="secondary-section-heading">
          <div>
            <h2 id="roster-heading">Our chapter team</h2>
            <p className="secondary-lede">
              Flamivor Charlotte is youth-led, with space for more students to
              contribute as the chapter grows.
            </p>
          </div>
        </div>

        <div className="secondary-team-grid">
          {leaders.map((leader) => (
            <Card className="secondary-card secondary-leader-card" key={leader.name}>
              <CardHeader className="secondary-leader-header">
                <span className="secondary-leader-monogram" aria-hidden="true">
                  {leader.initials}
                </span>
              </CardHeader>
              <CardContent className="secondary-leader-content">
                <CardTitle className="secondary-card-title">
                  <h3>{leader.name}</h3>
                </CardTitle>
                <p>{leader.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="secondary-team-note">
          This team is growing alongside the chapter. Students who want to help
          shape what comes next are welcome to get involved.
        </p>
      </section>
    </main>
  );
}

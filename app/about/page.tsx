import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, Lightbulb, UsersRound } from "lucide-react";
import { PhotoBand } from "@/components/photo-band";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our mission",
  description:
    "Meet the youth-led education nonprofit building a welcoming learning community in Charlotte, North Carolina.",
};

const principles = [
  {
    title: "Learn together",
    copy: "Begin with curiosity. Make room for questions, new skills, and different ways of understanding.",
    icon: BookOpen,
  },
  {
    title: "Lead with care",
    copy: "Share responsibility and help turn a thoughtful idea into a practical next step.",
    icon: UsersRound,
  },
  {
    title: "Pass it on",
    copy: "Share knowledge and encourage others to find their own way forward.",
    icon: Lightbulb,
  },
];

export default function About() {
  return (
    <main id="main" className="public-site secondary-page secondary-about">
      <section className="secondary-hero secondary-shell" aria-labelledby="about-title">
        <div className="secondary-hero-copy">
          <h1 id="about-title">Learning opens doors.</h1>
        </div>
        <div className="secondary-hero-aside">
          <p>
            A youth-led education nonprofit building a welcoming place for
            Charlotte students to learn, contribute, and grow together.
          </p>
          <Button asChild>
            <a href={site.form} target="_blank" rel="noreferrer">
              Find your place <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      <PhotoBand
        photo={photos.classroom}
        caption="Learning grows when we make room for one another."
      />

      <section className="secondary-section secondary-shell secondary-mission" aria-labelledby="mission-heading">
        <div className="secondary-section-heading">
          <div>
            <h2 id="mission-heading">Opportunity has more than one starting point.</h2>
            <p className="secondary-lede">
              What matters is the people and resources students can reach along the way.
            </p>
          </div>
        </div>
        <div className="secondary-mission-copy">
          <p>
            Flamivor Charlotte brings young people together around education
            and peer support. We want access to learning to depend less on
            where someone begins and more on the community they can find.
          </p>
          <p>
            We are shaping this chapter by listening to local students and
            building useful educational resources, learning opportunities,
            and ways to share skills. The work is growing, and Charlotte
            students can help decide what it becomes.
          </p>
        </div>
      </section>

      <section className="secondary-section secondary-shell" aria-labelledby="principles-heading">
        <div className="secondary-section-heading secondary-section-heading-wide">
          <div>
            <h2 id="principles-heading">A community shaped by what we share.</h2>
            <p className="secondary-lede">Three simple ways to take part in the work.</p>
          </div>
        </div>
        <div className="secondary-principles">
          {principles.map(({ title, copy, icon: Icon }) => (
            <Card className="secondary-card secondary-principle-card" key={title}>
              <CardHeader className="secondary-card-header">
                <Icon className="secondary-principle-icon" aria-hidden="true" />
                <CardTitle className="secondary-card-title"><h3>{title}</h3></CardTitle>
              </CardHeader>
              <CardContent className="secondary-card-content">
                <p>{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

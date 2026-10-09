import type { Metadata } from "next";
import { Invite, PageHeader } from "@/components/editorial";
import { PhotoBand } from "@/components/photo-band";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Our mission",
  description:
    "Meet the youth-led education nonprofit building a welcoming learning community in Charlotte, North Carolina.",
};

const principles = [
  {
    title: "Learn",
    copy: "Begin with curiosity. Make room for questions, new skills, and different ways of understanding.",
  },
  {
    title: "Lead",
    copy: "Share responsibility and help turn a thoughtful idea into a practical next step.",
  },
  {
    title: "Inspire",
    copy: "Pass knowledge along and encourage others to find their own way forward.",
  },
];

export default function About() {
  return (
    <main id="main">
      <PageHeader
        title={
          <>
            Learning opens doors.
          </>
        }
        description="A youth-led education nonprofit building a welcoming place for Charlotte students to learn, contribute, and grow together."
      />

      <section className="editorial-section shell" aria-labelledby="mission-heading">
        <div className="section-intro">
          <h2 id="mission-heading">Opportunity should have more than one starting point.</h2>
        </div>
        <div className="chapter-note">
          <p>
            Flamivor Charlotte brings young people together around education
            and peer support. We want access to learning to depend less on
            where someone begins and more on the people and resources they can
            reach along the way.
          </p>
          <p>
            We are shaping this chapter by listening to local students and
            building useful educational resources, learning opportunities,
            and ways to share skills. The work is growing, and Charlotte
            students can help decide what it becomes.
          </p>
        </div>
      </section>

      <PhotoBand photo={photos.classroom} caption="Learning grows when we make room for one another." />
      <section className="editorial-section shell" aria-labelledby="approach-heading">
        <div className="section-intro">
          <h2 id="approach-heading">Three ways to take part.</h2>
        </div>
        <div className="principle-grid">
          {principles.map((principle) => (
            <article className="editorial-row principle" key={principle.title}>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Invite />
    </main>
  );
}

import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, TextLink } from "@/components/editorial";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Find your next step with Flamivor Charlotte as a learner, volunteer, or local collaborator.",
};

const paths = [
  {
    id: "learner",
    index: "01",
    label: "I WANT TO LEARN",
    title: "Begin with a guide.",
    copy: "Read a free starter guide, then tell us what learning resources or support you would like to see in Charlotte.",
    action: (
      <TextLink href="/resources">Browse the free guides</TextLink>
    ),
  },
  {
    id: "volunteer",
    index: "02",
    label: "I WANT TO VOLUNTEER",
    title: "Bring a skill to share.",
    copy: "Help shape educational resources, outreach, or future chapter projects. Let us know what interests you and how you would like to contribute.",
    action: <TextLink href="#join-form">Share your interest</TextLink>,
  },
  {
    id: "partner",
    index: "03",
    label: "I WANT TO COLLABORATE",
    title: "Start a local conversation.",
    copy: "Are you part of a Charlotte school, community group, or organization? Tell us what you have in mind and we can explore a next step together.",
    action: (
      <a
        className="text-link"
        href={site.instagram}
        target="_blank"
        rel="noreferrer"
      >
        Message us on Instagram <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    ),
  },
];

export default function Join() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="FLAMIVOR CHARLOTTE / TAKE PART"
        title={
          <>
            FIND YOUR
            <br />
            NEXT STEP.
          </>
        }
        description="Come as a learner, a volunteer, or a local collaborator. Start with the part of the work that feels right for you."
      />

      <section className="editorial-section shell" aria-labelledby="join-heading">
        <div className="section-intro">
          <p className="eyebrow">THREE WAYS IN</p>
          <h2 id="join-heading">There is more than one way to contribute.</h2>
        </div>

        <div className="join-paths">
          {paths.map((path) => (
            <article className="join-path editorial-row" id={path.id} key={path.id}>
              <span className="row-index" aria-hidden="true">
                {path.index}
              </span>
              <div>
                <p className="eyebrow">{path.label}</p>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                {path.action}
              </div>
            </article>
          ))}
        </div>

        <aside className="form-callout" id="join-form" aria-labelledby="form-heading">
          <p className="eyebrow">CHAPTER INTEREST FORM</p>
          <h2 id="form-heading">Tell us what you would like to do.</h2>
          <p>
            Share a little about yourself, your interests, and how you hope to
            take part. The chapter form is the clearest way to reach the team.
          </p>
          <Button asChild>
            <a href={site.form} target="_blank" rel="noreferrer">
              Open the chapter form <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
          <small>Opens the official Google Form in a new tab.</small>
        </aside>
      </section>
    </main>
  );
}

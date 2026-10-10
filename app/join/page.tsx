import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, BookOpen, HandHeart, MessageCircle } from "lucide-react";
import { PhotoBand } from "@/components/photo-band";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Find your next step with Flamivor Charlotte as a learner, volunteer, or local collaborator.",
};

const paths = [
  {
    id: "learner",
    title: "Come to learn.",
    copy: "Read a free starter guide, then tell us what learning resources or support you would like to see in Charlotte.",
    action: { label: "Browse the free guides", href: "/resources", icon: BookOpen },
  },
  {
    id: "volunteer",
    title: "Bring a skill.",
    copy: "Help shape educational resources, outreach, or future chapter projects. Tell us what interests you and how you would like to contribute.",
    action: { label: "Share your interest", href: "#join-form", icon: HandHeart },
  },
  {
    id: "partner",
    title: "Start a conversation.",
    copy: "Part of a Charlotte school, community group, or organization? Reach out and we can explore a next step together.",
    action: { label: "Message us on Instagram", href: site.instagram, icon: MessageCircle, external: true },
  },
];

export default function Join() {
  return (
    <main id="main" className="public-site secondary-page secondary-join">
      <section className="secondary-hero secondary-shell" aria-labelledby="join-title">
        <div className="secondary-hero-copy">
          <h1 id="join-title">Find your next step.</h1>
        </div>
        <div className="secondary-hero-aside">
          <p>
            Come as a learner, a volunteer, or a local collaborator. Start with
            the part of the work that feels right for you.
          </p>
          <a className="secondary-scroll-link" href="#ways-to-join">
            Explore ways to join <ArrowDown aria-hidden="true" />
          </a>
        </div>
      </section>

      <PhotoBand
        photo={photos.collaboration}
        caption="Bring your curiosity. Find your people."
      />

      <section className="secondary-section secondary-shell" id="ways-to-join" aria-labelledby="ways-heading">
        <div className="secondary-section-heading secondary-section-heading-wide">
          <div>
            <h2 id="ways-heading">There is more than one way to contribute.</h2>
            <p className="secondary-lede">Choose a starting point that works for you.</p>
          </div>
        </div>

        <div className="secondary-path-list">
          {paths.map((path) => {
            const Icon = path.action.icon;
            return (
              <Card className="secondary-card secondary-path-card" id={path.id} key={path.id}>
                <CardHeader className="secondary-path-header">
                  <CardTitle className="secondary-card-title"><h3>{path.title}</h3></CardTitle>
                </CardHeader>
                <CardContent className="secondary-path-content">
                  <p>{path.copy}</p>
                </CardContent>
                <CardFooter className="secondary-path-footer">
                  <a
                    className="secondary-text-link"
                    href={path.action.href}
                    {...("external" in path.action && path.action.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <Icon aria-hidden="true" />
                    {path.action.label}
                    <ArrowUpRight className="secondary-link-arrow" aria-hidden="true" />
                  </a>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <Card className="secondary-card secondary-form-card" id="join-form">
          <CardHeader className="secondary-form-heading">
            <div>
              <CardTitle className="secondary-card-title">
                <h2 id="form-heading">Tell us what you would like to do.</h2>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="secondary-form-content">
            <p>
              Share a little about yourself, your interests, and how you hope
              to take part. The chapter form is the clearest way to reach the team.
            </p>
            <Button asChild>
              <a href={site.form} target="_blank" rel="noreferrer">
                Open the chapter form <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
            <small>Opens the official Google Form in a new tab.</small>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/retro/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/retro/card";
import { TextLink, Invite } from "@/components/editorial";
import { DesktopMotion } from "@/components/desktop-motion";
import { resources } from "@/lib/resources";
import { leaders, site } from "@/lib/site";
import { photos } from "@/lib/photos";
import { UnsplashImage } from "@/components/unsplash-image";

const paths = [
  {
    title: "For learners",
    description:
      "Explore practical guides for study habits, hands-on projects, and supporting a peer.",
    url: "/resources",
    label: "Browse free guides",
  },
  {
    title: "For volunteers",
    description:
      "Bring your skills and ideas as the Charlotte chapter develops useful learning opportunities.",
    url: "/join#volunteer",
    label: "Volunteer with us",
  },
  {
    title: "For local partners",
    description:
      "Share knowledge, a space, or an idea for working together with Charlotte students.",
    url: "/join#partner",
    label: "Explore a partnership",
  },
];

export default function Home() {
  return (
    <main id="main">
      <div id="home-content">
        <section className="community-hero shell">
          <h1 className="retro-hero-heading">Learning grows<br />when we <em>share it.</em></h1>
          <div className="community-opening">
            <p>
              Flamivor Charlotte is a youth-led education chapter building ways
              for students to learn, lead, and support one another.
            </p>
            <div className="community-actions">
              <Button asChild>
                <a href={site.form} target="_blank" rel="noreferrer">
                  Get involved <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
          <figure className="community-hero-photo">
            <div className="hero-photo-crop">
              <div className="hero-photo-parallax">
                <UnsplashImage
                  photo={photos.collaboration}
                  priority
                  sizes="(max-width: 767px) 100vw, 58vw"
                />
              </div>
            </div>
          </figure>
          <Card className="hero-guide-card">
            <CardHeader>
              <CardTitle><h2>Start with a<br />good question.</h2></CardTitle>
            </CardHeader>
            <CardContent>
              <p>Build a study habit. Try a project. Help a friend learn.</p>
              <p>Our original starter guides are free to read and put into practice.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="inverse"><Link href="/resources">Explore the guides <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></Link></Button>
            </CardFooter>
          </Card>
          <div className="community-context">
            <p>Charlotte, North Carolina</p>
            <p>
              Learn. Share. Lead.
            </p>
          </div>
        </section>

        <section className="mission-section shell">
          <figure className="mission-photo">
            <UnsplashImage
              photo={photos.study}
              sizes="(max-width: 767px) 100vw, 32vw"
            />
          </figure>
          <div className="mission-content">
            <h2>A local chapter. A shared purpose.</h2>
            <div className="mission-columns">
              <p>
                Flamivor Charlotte is a youth-led nonprofit chapter making
                education more accessible, meaningful, and connected to our
                community.
              </p>
              <div>
                <p>
                  We&apos;re building toward educational resources, tutoring,
                  workshops, mentorship, and local outreach. Every useful idea
                  starts with someone willing to contribute.
                </p>
                <TextLink href="/about">About the chapter</TextLink>
              </div>
            </div>
          </div>
        </section>

        <section className="participation-section shell" aria-labelledby="participation-title">
          <div className="section-heading">
            <h2 id="participation-title">There is a place for you here.</h2>
          </div>
          <div className="participation-journey">
            {paths.map((path) => (
              <article className="journey-chapter" key={path.title}>
                <div className="journey-display">
                  <h3>{path.title}</h3>
                </div>
                <div className="journey-copy">
                  <p>{path.description}</p>
                  <TextLink href={path.url}>{path.label}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-guide-section shell">
          <div className="section-heading">
            <h2>A good place to start.</h2>
            <p>Original starter guides, free to read and ready to put into practice.</p>
          </div>
          <div className="home-guide-list">
            {resources.map((resource) => (
              <Link
                className="home-guide-entry"
                href={`/resources/${resource.slug}`}
                key={resource.slug}
              >
                <span className="home-guide-category">{resource.category}</span>
                <span className="home-guide-copy">
                  <span className="home-guide-title">{resource.title}</span>
                  <span className="home-guide-description">{resource.description}</span>
                </span>
                <span className="home-guide-time">{resource.time}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
          <TextLink href="/resources">See all free guides</TextLink>
        </section>

        <section className="home-people shell">
          <div className="people-intro">
            <h2>Meet the chapter.</h2>
            <p>The students helping shape Flamivor Charlotte&apos;s next steps.</p>
            <TextLink href="/team">Meet the people</TextLink>
          </div>
          <figure className="people-image">
            <div className="photo-frame">
              <UnsplashImage
                photo={photos.classroom}
                sizes="(max-width: 767px) 100vw, 46vw"
              />
            </div>
          </figure>
          <div className="people-roster">
            {leaders.map((leader) => (
              <div className="roster-line" key={leader.name}>
                <span>{leader.name}</span>
                <span>{leader.role}</span>
              </div>
            ))}
          </div>
        </section>

        <Invite />
      </div>
      <DesktopMotion />
    </main>
  );
}

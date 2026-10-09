import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextLink, Invite } from "@/components/editorial";
import { ResourceCard } from "@/components/resource-card";
import { DesktopMotion } from "@/components/desktop-motion";
import { resources } from "@/lib/resources";
import { leaders, site } from "@/lib/site";
import { photos } from "@/lib/photos";
import { UnsplashImage } from "@/components/unsplash-image";
import { PhotoBand, PhotoCredit } from "@/components/photo-band";
const paths = [
  { word: "Learn.", type: "FOR CURIOUS MINDS", name: "Start with a question.", description: "Try a hands-on project, find your study rhythm, or learn how to support a peer. Our starter guides are open to everyone.", url: "/resources", label: "Explore free guides" },
  { word: "Lead.", type: "FOR STUDENTS WHO STEP UP", name: "Put your ideas to work.", description: "Help shape resources, learning opportunities, and local outreach. Bring your skills and help the chapter take its next step.", url: "/join#volunteer", label: "Become a volunteer" },
  { word: "Inspire.", type: "FOR OUR LOCAL COMMUNITY", name: "Open a door for someone.", description: "Have knowledge to share, a space to offer, or an idea for a collaboration? Let's build something useful for Charlotte students.", url: "/join#partner", label: "Connect with the chapter" },
];
export default function Home() {
  return (
    <main id="main">
      <div id="home-content">
        <section className="campaign-hero">
          <div className="shell campaign-stage">
            <div className="campaign-copy">
              <p className="eyebrow">YOUTH-LED EDUCATION. CHARLOTTE, NC.</p>
              <h1 aria-label="Charlotte. Your next chapter."><span className="hero-line"><span>Charlotte.</span></span><span className="hero-line"><span>Your next</span></span><span className="hero-line"><span>chapter.</span></span></h1>
              <p className="campaign-description">A city full of potential. A generation ready to build. We&apos;re creating more ways to learn, lead, and inspire, together.</p>
              <div className="campaign-actions">
                <Button asChild className="button-light"><a href={site.form} target="_blank" rel="noreferrer">Get involved <ArrowUpRight aria-hidden="true" /></a></Button>
                <TextLink href="/about">Meet Flamivor Charlotte</TextLink>
              </div>
            </div>
            <figure className="hero-photo">
              <div className="hero-photo-crop"><div className="hero-photo-parallax"><UnsplashImage photo={photos.collaboration} priority sizes="(max-width: 767px) 100vw, 48vw" /></div></div>
              <figcaption><span>Learning is better together.</span><PhotoCredit photo={photos.collaboration} /></figcaption>
            </figure>
          </div>
          <div className="hero-edition shell"><span>FLAMIVOR CHARLOTTE</span><span>LEARN / LEAD / INSPIRE</span><span>BUILT BY STUDENTS, FOR WHAT COMES NEXT.</span></div>
        </section>
        <section className="mission-section shell">
          <figure className="mission-photo"><UnsplashImage photo={photos.study} sizes="(max-width: 767px) 100vw, 28vw" /><figcaption><PhotoCredit photo={photos.study} /></figcaption></figure>
          <div className="mission-content">
            <h2>Education moves<br /><span className="mission-emphasis">when we do.</span></h2>
            <div className="mission-columns"><p>Flamivor Charlotte is a youth-led nonprofit chapter making education more accessible, meaningful, and connected to our community.</p><div><p>We&apos;re building toward educational resources, tutoring, workshops, mentorship, and local outreach. Every useful idea starts with someone willing to contribute.</p><TextLink href="/about">What we&apos;re building</TextLink></div></div>
          </div>
        </section>
        <PhotoBand photo={photos.classroom} caption="More opportunities to learn. More people to learn with." />
        <section className="participation-section" aria-labelledby="participation-title">
          <div className="shell">
            <div className="section-heading"><h2 id="participation-title">Find your<br />way in.</h2><p>You don&apos;t need to have it all figured out.<br />You just need a place to begin.</p></div>
            <div className="participation-journey">
              <div className="journey-line" aria-hidden="true"><span /></div>
              {paths.map((path) => <article className="journey-chapter" key={path.word}>
                <div className="journey-display"><span className="eyebrow">{path.type}</span><h3>{path.word}</h3></div>
                <div className="journey-copy"><h4>{path.name}</h4><p>{path.description}</p><TextLink href={path.url}>{path.label}</TextLink></div>
              </article>)}
            </div>
          </div>
        </section>
        <section className="resource-section shell">
          <div className="section-heading"><div><p className="eyebrow">THE CHARLOTTE FIELD GUIDE</p><h2>Small steps.<br />Real learning.</h2></div><div className="section-side"><p>Original guides for getting started.<br />Free to read. Yours to put into practice.</p><TextLink href="/resources">Open the field guide</TextLink></div></div>
          <div className="resource-grid">{resources.map((resource) => <ResourceCard key={resource.slug} resource={resource} />)}</div>
        </section>
        <section className="home-people shell">
          <div className="people-intro"><h2>A local chapter.<br />A shared effort.</h2><p>Meet the students helping turn the chapter&apos;s purpose into its next practical step.</p><TextLink href="/team">Meet the people</TextLink></div>
          <div className="people-roster">{leaders.map((leader) => <div className="roster-line" key={leader.name}><span>{leader.name}</span><span>{leader.role}</span></div>)}</div>
        </section>
        <Invite />
      </div>
      <DesktopMotion />
    </main>
  );
}

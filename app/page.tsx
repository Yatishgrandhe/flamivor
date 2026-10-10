import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TextLink, Invite } from "@/components/editorial";
import { DesktopMotion } from "@/components/desktop-motion";
import { ResourceCard } from "@/components/resource-card";
import { resources } from "@/lib/resources";
import { leaders, site } from "@/lib/site";
import { photos } from "@/lib/photos";
import { UnsplashImage } from "@/components/unsplash-image";

const questions = [
  { question: "What is Flamivor Charlotte?", answer: "We’re a youth-led nonprofit chapter focused on making education more accessible, meaningful, and connected to our local community. Students help shape the resources, projects, and opportunities we build." },
  { question: "How can I get involved?", answer: "Start with our chapter membership form. Tell us about your interests and how you’d like to help, whether that’s creating resources, volunteering, or bringing a new idea. You can also follow the chapter on Instagram for updates." },
  { question: "Do I need an account to use the guides?", answer: "No. Every starter guide is free to read without signing in. A member account lets you save guides and keep your chapter profile in one place." },
  { question: "Are tutoring sessions and workshops available now?", answer: "We’re building toward tutoring, workshops, mentorship, and local outreach. Follow our Charlotte Instagram for confirmed opportunities as they become available." },
];

export default function Home() {
  return <main id="main"><div id="home-content">
    <section className="welcome-hero shell" aria-labelledby="welcome-title">
      <div className="welcome-copy">
        <h1 id="welcome-title">A little curiosity.<br />A whole <em>community.</em></h1>
        <p>We’re Flamivor Charlotte. A youth-led chapter bringing people together to make learning more accessible—and more human.</p>
        <div className="welcome-actions">
          <Button asChild><a href={site.form} target="_blank" rel="noreferrer">Find your place <ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a></Button>
          <Button asChild variant="outline"><Link href="/resources">Explore free guides <ArrowRight data-icon="inline-end" aria-hidden="true" /></Link></Button>
        </div>
      </div>
      <div className="welcome-gallery" aria-label="People learning and sharing ideas">
        <figure className="welcome-photo welcome-photo-side"><UnsplashImage photo={photos.study} priority sizes="(max-width: 767px) 32vw, 24vw" /></figure>
        <figure className="welcome-photo welcome-photo-main"><div className="welcome-photo-inner"><UnsplashImage photo={photos.collaboration} priority sizes="(max-width: 767px) 80vw, 52vw" /></div></figure>
        <figure className="welcome-photo welcome-photo-side"><UnsplashImage photo={photos.classroom} priority sizes="(max-width: 767px) 32vw, 24vw" /></figure>
      </div>
      <div className="welcome-footnote"><span>Rooted in Charlotte, North Carolina.</span><a href="#our-purpose">Get to know us <ArrowRight size={16} aria-hidden="true" /></a></div>
    </section>

    <section className="purpose-section shell" id="our-purpose" aria-labelledby="purpose-title">
      <h2 id="purpose-title">More chances to learn.<br />More people in your corner.</h2>
      <div className="purpose-copy"><p>Education should open doors. We’re here to help more young people find the resources, encouragement, and community to walk through them.</p><p>From useful learning guides to the tutoring, workshops, and mentorship we’re building toward, our next chapter starts with Charlotte.</p><TextLink href="/about">Our purpose, in practice</TextLink></div>
    </section>

    <section className="take-part-section" aria-labelledby="take-part-title"><div className="shell">
      <div className="section-heading"><h2 id="take-part-title">Bring what makes you, you.</h2><p>A question. A skill. An idea.<br />There’s a place to begin.</p></div>
      <div className="participation-features">
        <Card className="participation-feature">
          <CardHeader><BookOpen className="feature-icon" strokeWidth={1.5} aria-hidden="true" /><CardTitle><h3>Make room for learning.</h3></CardTitle><CardDescription>For curious minds, at any starting point.</CardDescription></CardHeader>
          <CardContent><p>Find a new study habit, try a hands-on project, or learn how to support a friend. Our original guides help you take the next small step.</p></CardContent>
          <CardFooter><Button variant="outline" asChild><Link href="/resources">Find a guide <ArrowRight data-icon="inline-end" aria-hidden="true" /></Link></Button></CardFooter>
        </Card>
        <Card className="participation-feature">
          <CardHeader><HeartHandshake className="feature-icon" strokeWidth={1.5} aria-hidden="true" /><CardTitle><h3>Share a little of yourself.</h3></CardTitle><CardDescription>For volunteers and local collaborators.</CardDescription></CardHeader>
          <CardContent><p>Bring your time, perspective, or a skill to share. Help shape resources and future projects that respond to what Charlotte students need.</p></CardContent>
          <CardFooter><Button variant="outline" asChild><Link href="/join">Ways to get involved <ArrowRight data-icon="inline-end" aria-hidden="true" /></Link></Button></CardFooter>
        </Card>
      </div>
    </div></section>

    <section className="guide-shelf shell" aria-labelledby="guides-title">
      <div className="section-heading"><div><h2 id="guides-title">Something useful to take with you.</h2><p>Free starter guides. Small steps you can try today.</p></div><TextLink href="/resources">Browse the library</TextLink></div>
      <div className="resource-grid">{resources.map(resource => <ResourceCard key={resource.slug} resource={resource} />)}</div>
    </section>

    <section className="chapter-section shell" aria-labelledby="chapter-title">
      <div className="chapter-intro"><h2 id="chapter-title">Youth-led.<br />Charlotte-rooted.</h2><p>Meet the students helping turn a shared belief in education into the next steps for our chapter.</p><TextLink href="/team">Meet the team</TextLink></div>
      <div className="chapter-roster">{leaders.map(leader => <div className="chapter-person" key={leader.name}><span className="person-initials" aria-hidden="true">{leader.initials}</span><div><h3>{leader.name}</h3><p>{leader.role}</p></div></div>)}</div>
    </section>

    <section className="questions-section shell" aria-labelledby="questions-title"><div><h2 id="questions-title">A few good questions.</h2><p>Getting to know the chapter starts here.</p><a className="text-link" href={site.instagram} target="_blank" rel="noreferrer">Ask us on Instagram <ArrowUpRight size={18} aria-hidden="true" /></a></div><Accordion type="single" collapsible>{questions.map(item => <AccordionItem key={item.question} value={item.question}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>)}</Accordion></section>
    <Invite />
  </div><DesktopMotion /></main>;
}

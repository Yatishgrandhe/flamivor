import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "A plain-language guide to information used by the Flamivor Charlotte website and chapter interest form.",
};

const sections = [
  {
    title: "Reading the site",
    content: (
      <p>
        Public pages and educational guides are available without an account.
        You do not need to sign in to read them.
      </p>
    ),
  },
  {
    title: "Member space",
    content: (
      <>
        <p>
          If you use the member space, the site uses Clerk to handle sign-in
          and Convex to store the name, role, and interests you submit, along
          with the guides you choose to save. The member features currently
          connect to a Clerk development instance.
        </p>
        <p>
          Your saved profile and guides are associated with your signed-in
          account. The member space lets you clear that saved site data. This
          does not delete your Clerk sign-in account. Please keep private or
          sensitive details out of the interests field.
        </p>
      </>
    ),
  },
  {
    title: "Chapter interest form",
    content: (
      <p>
        The chapter form opens Google Forms in a new tab. Information you
        submit there is handled by Google and the form administrators under
        their own practices. Saving interests in the member space does not
        submit the form or confirm acceptance into a role.
      </p>
    ),
  },
  {
    title: "Questions",
    content: (
      <p>
        For questions about information you share with Flamivor Charlotte,
        contact the chapter through{" "}
        <a
          className="text-link"
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
        >
          @flamivor.charlotte
        </a>
        .
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="FLAMIVOR CHARLOTTE / PRIVACY"
        title={
          <>
            YOUR DATA,
            <br />
            PLAINLY STATED.
          </>
        }
        description="What the public site needs, what the member space saves, and where the chapter form takes you."
      />

      <section className="editorial-section shell privacy-copy" aria-label="Privacy details">
        {sections.map((section, index) => (
          <article className="editorial-row" key={section.title}>
            <span className="row-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>{section.title}</h2>
              {section.content}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

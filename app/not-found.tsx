import { TextLink } from "@/components/editorial";
export default function NotFound() {
  return (
    <main id="main" className="not-found shell">
      <p className="eyebrow" style={{ justifyContent: "center" }}>
        A SMALL DETOUR
      </p>
      <h1>This page isn&apos;t here.</h1>
      <p>There&apos;s plenty more to explore in Charlotte.</p>
      <TextLink href="/">Back to the beginning</TextLink>
    </main>
  );
}

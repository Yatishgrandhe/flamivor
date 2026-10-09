import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Member space",
  robots: { index: false, follow: false },
};

export default async function Members({
  searchParams,
}: {
  searchParams: Promise<{ save?: string | string[] }>;
}) {
  const { save } = await searchParams;
  const query = new URLSearchParams();
  if (typeof save === "string" && save) query.set("save", save);
  redirect(`/dashboard${query.size ? `?${query.toString()}` : ""}`);
}

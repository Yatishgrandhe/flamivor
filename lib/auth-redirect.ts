const DEFAULT_AUTH_REDIRECT = "/dashboard";

/** Accept only same-site, root-relative destinations for completed auth flows. */
export function safeAuthRedirect(value: string | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return DEFAULT_AUTH_REDIRECT;
  }

  try {
    const destination = new URL(value, "https://flamivor.invalid");
    if (destination.origin !== "https://flamivor.invalid") {
      return DEFAULT_AUTH_REDIRECT;
    }
    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return DEFAULT_AUTH_REDIRECT;
  }
}

import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
const role = v.union(
  v.literal("learner"),
  v.literal("volunteer"),
  v.literal("partner"),
);
const profile = v.object({ name: v.string(), role, interests: v.string() });
const knownSlugs = ["paper-bridge", "study-reset", "peer-mentor"];
export const get = query({
  args: {},
  returns: v.object({
    profile: v.union(profile, v.null()),
    bookmarks: v.array(v.string()),
  }),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity)
      throw new ConvexError("Sign in to access your member space.");
    const p = await ctx.db
      .query("profiles")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    const saved = await ctx.db
      .query("bookmarks")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .take(20);
    return {
      profile: p
        ? { name: p.name, role: p.role, interests: p.interests }
        : null,
      bookmarks: saved.map((b) => b.slug),
    };
  },
});
export const saveProfile = mutation({
  args: { name: v.string(), role, interests: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Sign in before saving.");
    const name = args.name.trim(),
      interests = args.interests.trim();
    if (name.length < 2 || name.length > 80)
      throw new ConvexError("Please use a name between 2 and 80 characters.");
    if (interests.length > 1000)
      throw new ConvexError(
        "Please keep your interests under 1,000 characters.",
      );
    const current = await ctx.db
      .query("profiles")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    const data = { name, role: args.role, interests, updatedAt: Date.now() };
    if (current) await ctx.db.patch(current._id, data);
    else
      await ctx.db.insert("profiles", {
        ...data,
        tokenIdentifier: identity.tokenIdentifier,
      });
    return null;
  },
});
export const setBookmark = mutation({
  args: { slug: v.string(), saved: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Sign in before saving a guide.");
    if (!knownSlugs.includes(args.slug))
      throw new ConvexError("This guide is unavailable.");
    const record = await ctx.db
      .query("bookmarks")
      .withIndex("by_tokenIdentifier_and_slug", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier).eq("slug", args.slug),
      )
      .unique();
    if (args.saved && !record)
      await ctx.db.insert("bookmarks", {
        slug: args.slug,
        tokenIdentifier: identity.tokenIdentifier,
      });
    if (!args.saved && record) await ctx.db.delete(record._id);
    return null;
  },
});
export const clearMyData = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Sign in before clearing your data.");
    const profile = await ctx.db
      .query("profiles")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .take(20);
    for (const record of bookmarks) await ctx.db.delete(record._id);
    if (profile) await ctx.db.delete(profile._id);
    return null;
  },
});

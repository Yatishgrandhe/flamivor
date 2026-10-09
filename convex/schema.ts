import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  profiles: defineTable({
    tokenIdentifier: v.string(),
    name: v.string(),
    role: v.union(
      v.literal("learner"),
      v.literal("volunteer"),
      v.literal("partner"),
    ),
    interests: v.string(),
    updatedAt: v.number(),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  bookmarks: defineTable({ tokenIdentifier: v.string(), slug: v.string() })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_tokenIdentifier_and_slug", ["tokenIdentifier", "slug"]),
});

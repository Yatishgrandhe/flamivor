"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { resources } from "@/lib/resources";
import { ResourceCard } from "./resource-card";

const categories = [
  "All field notes",
  ...Array.from(new Set(resources.map((resource) => resource.category))),
];

export function ResourceBrowser() {
  const [filter, setFilter] = useState("All field notes");
  const [search, setSearch] = useState("");
  const query = search.trim().toLocaleLowerCase();
  const shown = resources.filter((resource) => {
    const matchesCategory =
      filter === "All field notes" || resource.category === filter;
    const matchesSearch =
      !query ||
      `${resource.title} ${resource.description} ${resource.category}`
        .toLocaleLowerCase()
        .includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="resource-toolbar">
        <div className="resource-search-wrap">
          <label className="sr-only" htmlFor="resource-search">
            Search field notes
          </label>
          <Search size={18} aria-hidden="true" />
          <input
            id="resource-search"
            className="resource-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search titles and topics"
            autoComplete="off"
          />
          {search && (
            <button
              className="resource-clear-search"
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear resource search"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
        <div
          className="resource-filters"
          role="group"
          aria-label="Filter field notes by topic"
        >
          {categories.map((category) => (
            <button
              className="filter-button"
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="resource-grid">
        {shown.map((resource) => (
          <ResourceCard resource={resource} key={resource.slug} />
        ))}
      </div>
      <p className="resource-footnote" role="status" aria-live="polite">
        Showing {shown.length} of {resources.length} guides.
      </p>
      {shown.length === 0 && (
        <div className="resource-empty">
          <h2>No field notes found.</h2>
          <p>Try another word or clear your filters to browse every guide.</p>
          {(search || filter !== "All field notes") && (
            <button
              className="filter-button"
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("All field notes");
              }}
            >
              Clear search and filters
            </button>
          )}
        </div>
      )}
    </>
  );
}

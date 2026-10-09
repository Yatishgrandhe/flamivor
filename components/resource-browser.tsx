"use client";
import { useRef, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { resources } from "@/lib/resources";
import { ResourceCard } from "./resource-card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

const categories = [
  "All field notes",
  ...Array.from(new Set(resources.map((resource) => resource.category))),
];

export function ResourceBrowser() {
  const [filter, setFilter] = useState("All field notes");
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
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
        <Field className="resource-search-wrap">
          <FieldLabel className="sr-only" htmlFor="resource-search">
            Search field notes
          </FieldLabel>
          <InputGroup>
          <InputGroupAddon><Search aria-hidden="true" /></InputGroupAddon>
          <InputGroupInput
            id="resource-search"
            ref={searchRef}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search titles and topics"
            autoComplete="off"
            enterKeyHint="search"
          />
          {search && (
            <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-sm"
              onClick={() => { setSearch(""); searchRef.current?.focus(); }}
              aria-label="Clear resource search"
            >
              <X aria-hidden="true" />
            </InputGroupButton>
            </InputGroupAddon>
          )}
          </InputGroup>
        </Field>
        <ToggleGroup
          className="resource-filters"
          type="single"
          variant="outline"
          value={filter}
          onValueChange={(value) => { if (value) setFilter(value); }}
          spacing={2}
          aria-label="Filter field notes by topic"
        >
          {categories.map((category) => (
            <ToggleGroupItem
              key={category}
              value={category}
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
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
        <Empty className="resource-empty">
          <EmptyHeader>
          <EmptyMedia variant="icon"><SearchX aria-hidden="true" /></EmptyMedia>
          <EmptyTitle>No field notes found</EmptyTitle>
          <EmptyDescription>Try another word or clear your filters to browse every guide.</EmptyDescription>
          </EmptyHeader>
          {(search || filter !== "All field notes") && (
            <EmptyContent>
            <Button variant="outline"
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("All field notes");
                searchRef.current?.focus();
              }}
            >
              Clear search and filters
            </Button>
            </EmptyContent>
          )}
        </Empty>
      )}
    </>
  );
}

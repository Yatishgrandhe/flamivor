"use client";

import { useEffect } from "react";

/** Decorative control motion never delays keyboard interactions. */
export function InputModality() {
  useEffect(() => {
    const root = document.documentElement;
    const keyboard = (event: KeyboardEvent) => {
      if (!event.altKey && !event.metaKey && !event.ctrlKey) root.dataset.inputMode = "keyboard";
    };
    const pointer = () => { root.dataset.inputMode = "pointer"; };
    window.addEventListener("keydown", keyboard, true);
    window.addEventListener("pointerdown", pointer, true);
    return () => {
      window.removeEventListener("keydown", keyboard, true);
      window.removeEventListener("pointerdown", pointer, true);
      delete root.dataset.inputMode;
    };
  }, []);
  return null;
}

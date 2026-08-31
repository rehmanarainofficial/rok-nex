"use client";

import { useSyncExternalStore } from "react";

const SCROLLED_OFFSET = 12;

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getSnapshot() {
  return window.scrollY > SCROLLED_OFFSET;
}

function getServerSnapshot() {
  return false;
}

export function useHeaderScrolled() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

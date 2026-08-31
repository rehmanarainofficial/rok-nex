"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("rox-nex-theme", theme);
}

export function ThemeSwitcher() {
  const toggleTheme = useCallback(() => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
  }, []);

  return (
    <button
      aria-label="Toggle color theme"
      className="grid size-10 place-items-center rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-soft)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      onClick={toggleTheme}
      type="button"
      title="Toggle color theme"
    >
      <Sun aria-hidden="true" className="hidden dark:block" size={18} />
      <Moon aria-hidden="true" className="dark:hidden" size={18} />
    </button>
  );
}

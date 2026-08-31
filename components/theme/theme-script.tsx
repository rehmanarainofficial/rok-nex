export function ThemeScript() {
  const script = `
    (() => {
      try {
        const stored = localStorage.getItem("rox-nex-theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = stored || (prefersDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.dataset.theme = theme;
      } catch {
        document.documentElement.classList.add("dark");
        document.documentElement.dataset.theme = "dark";
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export function ThemeScript() {
  const script = `
    (() => {
      try {
        const stored = localStorage.getItem("rox-nex-theme");
        const theme = stored || "dark";
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

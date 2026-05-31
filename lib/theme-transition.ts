export type ThemeTransitionOrigin = { x: number; y: number };

let transitioning = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smooth crossfade — page stays visible, colors blend to new theme. */
export function runThemeSpreadTransition(
  _nextTheme: "light" | "dark",
  applyTheme: () => void,
  _origin?: ThemeTransitionOrigin,
): void {
  if (typeof document === "undefined") {
    applyTheme();
    return;
  }

  if (prefersReducedMotion() || transitioning) {
    applyTheme();
    return;
  }

  const startTransition = document.startViewTransition?.bind(document);
  if (!startTransition) {
    applyTheme();
    return;
  }

  const root = document.documentElement;
  transitioning = true;
  root.classList.add("theme-crossfade");

  const transition = startTransition(() => {
    applyTheme();
  });

  transition.finished
    .finally(() => {
      transitioning = false;
      root.classList.remove("theme-crossfade");
    })
    .catch(() => {
      transitioning = false;
      root.classList.remove("theme-crossfade");
    });
}

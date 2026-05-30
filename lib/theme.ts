export const THEME_STORAGE_KEY = "protronics-theme";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

/** Inline script — runs before paint to prevent theme flash (must match next-themes storageKey). */
export const THEME_BLOCKING_SCRIPT = `(function(){try{var d=document.documentElement,k=${JSON.stringify(THEME_STORAGE_KEY)},s=localStorage.getItem(k);if(s==="light"||s==="dark"){d.setAttribute("data-theme",s);return;}if(s==="system"||!s){d.setAttribute("data-theme",window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");return;}d.setAttribute("data-theme","dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

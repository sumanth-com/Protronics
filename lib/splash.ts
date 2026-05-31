export const SPLASH_SESSION_KEY = "protronics-splash-seen";

/** Total splash duration — 2.0s (fade begins at 1.6s) */
export const SPLASH_EXIT_AT_MS = 1600;
export const SPLASH_HIDE_AT_MS = 2000;

export const SPLASH_TAGLINE = "Premium. Refurbished. Perfected.";

/**
 * Runs before paint on first session visit — sets page bg to match splash
 * so there is no white flash before React hydrates.
 */
export const SPLASH_BLOCKING_SCRIPT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(SPLASH_SESSION_KEY)}))return;document.documentElement.classList.add("splash-active");var t=document.documentElement.getAttribute("data-theme");var bg=t==="light"?"#f7f3ed":"#0a0a0a";document.documentElement.style.backgroundColor=bg;}catch(e){}})();`;

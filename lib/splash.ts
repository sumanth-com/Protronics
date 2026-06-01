export const SPLASH_SESSION_KEY = "protronics-splash-seen";

/** Total splash duration — 3.0s (fade begins at 2.4s) */
export const SPLASH_EXIT_AT_MS = 2400;
export const SPLASH_HIDE_AT_MS = 3000;

export const SPLASH_TAGLINE = "Premium. Refurbished. Perfected.";

/**
 * Runs before paint on first session visit — sets page bg to match splash
 * so there is no white flash before React hydrates.
 */
export const SPLASH_BLOCKING_SCRIPT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(SPLASH_SESSION_KEY)}))return;document.documentElement.classList.add("splash-active");var t=document.documentElement.getAttribute("data-theme");var bg=t==="light"?"#f7f3ed":"#0a0a0a";document.documentElement.style.backgroundColor=bg;}catch(e){}})();`;

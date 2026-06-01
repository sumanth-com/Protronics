export const SPLASH_SESSION_KEY = "protronics-splash-seen";
export const SPLASH_START_KEY = "protronics-splash-start";

/** Full splash hold 3s, then cinematic fade (~0.75s), then app is live */
export const SPLASH_EXIT_AT_MS = 3000;
export const SPLASH_HIDE_AT_MS = 3750;
export const SPLASH_DURATION_MS = SPLASH_HIDE_AT_MS;

export const SPLASH_TAGLINE = "Premium. Refurbished. Perfected.";

/**
 * Runs before paint on first session visit — sets page bg to match splash
 * so there is no white flash before React hydrates.
 */
export const SPLASH_BLOCKING_SCRIPT = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(SPLASH_SESSION_KEY)}))return;sessionStorage.setItem(${JSON.stringify(SPLASH_START_KEY)},String(Date.now()));document.documentElement.classList.add("splash-active");document.documentElement.style.backgroundColor="#f7f3ed";document.documentElement.style.colorScheme="light";}catch(e){}})();`;

// Site JS entry — bundled to dist/site.js (Namo "Site JS", runs on every page).
// Registering all custom elements here means any page can use <taspa-*> tags in
// its Page HTML with zero per-page script.
import '../components/index.js';

// Signal readiness (useful for pages that want to run after components register).
document.documentElement.setAttribute('data-taspa-ready', '');

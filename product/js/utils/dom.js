// Tiny DOM helpers — keep components terse without a framework.

// Escape user/data strings before interpolating into innerHTML.
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Normalize a Namo path for comparison ("/" stays "/", trailing slash trimmed).
export function normalizePath(p) {
  if (!p) return '/';
  const clean = p.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function currentPath() {
  return normalizePath(location.pathname);
}

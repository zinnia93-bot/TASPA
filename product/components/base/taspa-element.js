// Base class for TASPA light-DOM Web Components.
//
// Light DOM (not Shadow DOM) is intentional: global Site CSS + design tokens
// style every component, and authored inner content stays in the page source
// (SEO-friendly). Content placed between tags is captured and passed to
// render() so wrapper components (card, section) can re-project it.
export class TaspaElement extends HTMLElement {
  connectedCallback() {
    if (this._mounted) return;
    this._initialHTML = this.innerHTML;
    this.innerHTML = this.render(this._initialHTML);
    this._mounted = true;
    this.mounted?.();
  }

  disconnectedCallback() {
    this._cleanup?.();
  }

  // Override in subclasses. Receives the original inner HTML (for wrappers).
  render(_slot) {
    return this.innerHTML;
  }

  attr(name, fallback = '') {
    const v = this.getAttribute(name);
    return v == null ? fallback : v;
  }

  $(sel) { return this.querySelector(sel); }
  $$(sel) { return Array.from(this.querySelectorAll(sel)); }

  // Delegated event binding; returns an off() and is auto-cleaned on disconnect.
  on(sel, evt, handler) {
    const els = this.$$(sel);
    els.forEach((el) => el.addEventListener(evt, handler));
    const off = () => els.forEach((el) => el.removeEventListener(evt, handler));
    const prev = this._cleanup;
    this._cleanup = () => { prev?.(); off(); };
    return off;
  }
}

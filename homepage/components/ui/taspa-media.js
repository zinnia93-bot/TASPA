// <taspa-media src="" alt="" label="제품 UI 캡쳐" ratio="16 / 10" kind="ui|illustration" tone="light|dark">
// Renders an <img> when `src` is set; otherwise a labeled placeholder that keeps
// the given aspect ratio — so the real image (added later) drops straight in by
// just setting the `src` attribute. No layout shift when swapped.
import { TaspaElement } from '../base/taspa-element.js';
import { esc } from '../../js/utils/dom.js';

const ICON = {
  ui: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8M12 18v3"/></svg>',
  illustration: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="M4 17l4.5-5 3.5 3.5L16 12l4 5"/></svg>',
};

class TaspaMedia extends TaspaElement {
  render() {
    const ratio = this.attr('ratio', '16 / 10');
    const src = this.attr('src');
    if (src) {
      return `<figure class="media" style="aspect-ratio:${esc(ratio)}"><img src="${esc(src)}" alt="${esc(this.attr('alt'))}" loading="lazy" /></figure>`;
    }
    const label = this.attr('label', '이미지');
    const kind = this.attr('kind', 'ui');
    const dark = this.attr('tone') === 'dark' ? ' media--dark' : '';
    const icon = `<span class="media__icon" aria-hidden="true">${ICON[kind] || ICON.ui}</span>`;
    // compact = icon only (for small avatar slots); label lives in aria-label.
    if (this.hasAttribute('compact')) {
      return `<figure class="media media--ph media--compact${dark}" style="aspect-ratio:${esc(ratio)}" role="img" aria-label="${esc(label)} 자리표시">${icon}</figure>`;
    }
    return `<figure class="media media--ph${dark}" style="aspect-ratio:${esc(ratio)}" role="img" aria-label="${esc(label)} 자리표시">
      ${icon}
      <span class="media__label">${esc(label)}</span>
      <span class="media__hint">이미지는 나중에 삽입</span>
    </figure>`;
  }
}

customElements.define('taspa-media', TaspaMedia);

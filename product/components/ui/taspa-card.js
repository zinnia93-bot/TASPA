// <taspa-card title="...">  inner content  </taspa-card>
// Wrapper component: re-projects authored inner HTML (kept in page source).
import { TaspaElement } from '../base/taspa-element.js';
import { esc } from '../../js/utils/dom.js';

class TaspaCard extends TaspaElement {
  render(slot) {
    const title = this.attr('title');
    return `
      <div class="taspa-card">
        ${title ? `<div class="taspa-card__head"><h3 class="taspa-card__title">${esc(title)}</h3></div>` : ''}
        <div class="taspa-card__body">${slot}</div>
      </div>`;
  }
}

customElements.define('taspa-card', TaspaCard);

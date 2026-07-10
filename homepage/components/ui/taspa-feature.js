// <taspa-feature icon="⌁" title="식수 예측">  설명 텍스트  </taspa-feature>
// Wrapper card: re-projects authored inner content as the description.
import { TaspaElement } from '../base/taspa-element.js';
import { esc } from '../../js/utils/dom.js';

class TaspaFeature extends TaspaElement {
  render(slot) {
    const icon = this.attr('icon');
    const title = this.attr('title');
    return `
      <article class="feature">
        <div class="feature__icon" aria-hidden="true">${icon}</div>
        <h3 class="feature__title">${esc(title)}</h3>
        <p class="feature__desc">${slot}</p>
      </article>`;
  }
}

customElements.define('taspa-feature', TaspaFeature);

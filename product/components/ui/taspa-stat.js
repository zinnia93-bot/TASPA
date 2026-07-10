// <taspa-stat label="식수 인원" value="842" delta="+4.2%" trend="up"></taspa-stat>
import { TaspaElement } from '../base/taspa-element.js';
import { esc } from '../../js/utils/dom.js';

class TaspaStat extends TaspaElement {
  render() {
    const label = this.attr('label');
    const value = this.attr('value');
    const delta = this.attr('delta');
    const trend = this.attr('trend', 'up'); // up | down
    return `
      <div class="taspa-stat">
        <span class="taspa-stat__label">${esc(label)}</span>
        <span class="taspa-stat__value">${esc(value)}</span>
        ${delta ? `<span class="taspa-stat__delta ${trend === 'down' ? 'down' : 'up'}">${esc(delta)}</span>` : ''}
      </div>`;
  }
}

customElements.define('taspa-stat', TaspaStat);

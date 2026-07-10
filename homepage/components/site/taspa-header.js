// <taspa-header> — landing top bar: logo + nav + pill CTA.
// Sits absolutely over the hero (transparent).
import { TaspaElement } from '../base/taspa-element.js';

class TaspaHeader extends TaspaElement {
  render() {
    return `
      <header class="site-header">
        <div class="site-header__inner">
          <a class="brand" href="/">
            <span class="brand__mark" aria-hidden="true">T</span>
            <span class="brand__name">TASPA</span>
          </a>
          <span class="site-header__spacer"></span>
          <nav class="site-nav" aria-label="주 메뉴">
            <a href="#features">기능</a>
            <a href="#impact">도입 효과</a>
            <a href="#contact">문의</a>
          </nav>
        </div>
      </header>`;
  }
}

customElements.define('taspa-header', TaspaHeader);

// <taspa-sidebar> — brand + role switcher + role-filtered nav + "ZERO" card.
// Nav links are real page paths; the active item is derived from location.
import { TaspaElement } from '../base/taspa-element.js';
import { ROLES, navForRole } from '../../js/config.js';
import { getState, setRole, subscribe } from '../../js/store.js';
import { esc, currentPath, normalizePath } from '../../js/utils/dom.js';

class TaspaSidebar extends TaspaElement {
  render() {
    return `<aside class="taspa-sidebar" aria-label="사이드바"></aside>`;
  }

  mounted() {
    this._root = this.$('.taspa-sidebar');
    this._unsub = subscribe((state) => this.paint(state));

    // Delegated clicks for role switching.
    this._root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-role]');
      if (btn) setRole(btn.getAttribute('data-role'));
    });
  }

  disconnectedCallback() {
    this._unsub?.();
    super.disconnectedCallback();
  }

  paint(state) {
    const here = currentPath();
    const roleTabs = ROLES.map(
      (r) => `<button class="taspa-roleswitch__btn" type="button"
        data-role="${r.id}" aria-pressed="${r.id === state.role}">${esc(r.label)}</button>`,
    ).join('');

    const navItems = navForRole(state.role)
      .map((item) => {
        const active = normalizePath(item.path) === here;
        return `<a class="taspa-nav__item" href="${esc(item.path)}"
          ${active ? 'aria-current="page"' : ''}>
          <span class="taspa-nav__icon" aria-hidden="true">${item.icon}</span>
          <span>${esc(item.label)}</span>
        </a>`;
      })
      .join('');

    this._root.innerHTML = `
      <div class="taspa-brand">
        <div class="taspa-brand__row">
          <span class="taspa-brand__name">TASPA</span>
          <span class="taspa-brand__mark" aria-hidden="true">⌁</span>
        </div>
      </div>

      <div class="taspa-roleswitch" role="group" aria-label="역할 선택">${roleTabs}</div>

      <nav class="taspa-nav" aria-label="주 메뉴">${navItems}</nav>

      <section class="taspa-zero">
        <h3>음식물 폐기 ZERO에<br />함께하고 있어요</h3>
        <span class="taspa-zero__label">이번 달 절감 예상 금액</span>
        <span class="taspa-zero__value">₩ 1,250,000</span>
        <p class="taspa-zero__note">전년 동월 대비 12% 절감</p>
      </section>`;
  }
}

customElements.define('taspa-sidebar', TaspaSidebar);

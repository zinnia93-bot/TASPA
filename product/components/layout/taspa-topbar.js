// <taspa-topbar> — page title slot + date + notifications + profile.
// Usage:  <taspa-topbar title="대시보드"></taspa-topbar>
import { TaspaElement } from '../base/taspa-element.js';
import { getState, subscribe } from '../../js/store.js';
import { esc } from '../../js/utils/dom.js';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function today() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} (${WEEKDAYS[d.getDay()]})`;
}

class TaspaTopbar extends TaspaElement {
  render() {
    return `<header class="taspa-topbar"></header>`;
  }

  mounted() {
    this._root = this.$('.taspa-topbar');
    this._unsub = subscribe((state) => this.paint(state));
  }

  disconnectedCallback() {
    this._unsub?.();
    super.disconnectedCallback();
  }

  paint(state) {
    const title = this.attr('title');
    const u = state.user;
    this._root.innerHTML = `
      <button class="taspa-topbar__btn" type="button" title="메뉴" aria-label="메뉴">☰</button>
      ${title ? `<strong style="font-size:var(--fs-md)">${esc(title)}</strong>` : ''}
      <span class="taspa-topbar__spacer"></span>
      <button class="taspa-topbar__btn" type="button">▣ ${today()}</button>
      <button class="taspa-topbar__btn" type="button" title="알림" aria-label="알림">♧ <b>3</b></button>
      <button class="taspa-profile" type="button">
        <span class="taspa-profile__avatar">${esc(u.initial)}</span>
        <span>
          <span class="taspa-profile__name">${esc(u.name)}</span>
          <span class="taspa-profile__role">${esc(u.role)}</span>
        </span>
      </button>`;
  }
}

customElements.define('taspa-topbar', TaspaTopbar);

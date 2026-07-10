// <taspa-contact-modal> — site-wide lead-capture modal.
//
// Opened by ANY element carrying [data-contact-open] anywhere on the page
// (e.g. the hero "도입 문의" button, the CTA "데모 신청하기" button). The
// component listens at the document level, so triggers don't need to live
// inside it. Submits leads to the site admin via Namo's runtime API,
// API.Site_SendEmailToAdmin(subject, message, durationMS).
//
// Place ONE <taspa-contact-modal></taspa-contact-modal> per page.
import { TaspaElement } from '../base/taspa-element.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class TaspaContactModal extends TaspaElement {
  render() {
    return `
      <div class="tc-modal" role="dialog" aria-modal="true" aria-labelledby="tcTitle" hidden>
        <div class="tc-modal__overlay" data-contact-close></div>
        <div class="tc-modal__card">
          <button type="button" class="tc-modal__close" data-contact-close aria-label="닫기">&times;</button>

          <div class="tc-modal__view" data-view="form">
            <h2 class="tc-modal__title" id="tcTitle">도입 문의</h2>
            <p class="tc-modal__sub">도입이 궁금하신가요? 남겨주시면 담당자가<br />영업일 기준 1일 내 연락드립니다.</p>

            <form class="tc-form" novalidate>
              <div class="tc-field">
                <label class="tc-field__label" for="tcName">이름 <span class="req">*</span></label>
                <input class="tc-input" id="tcName" name="name" type="text" autocomplete="name" placeholder="성함을 입력해 주세요" />
                <p class="tc-field__err">이름을 입력해 주세요.</p>
              </div>
              <div class="tc-field">
                <label class="tc-field__label" for="tcEmail">이메일 <span class="req">*</span></label>
                <input class="tc-input" id="tcEmail" name="email" type="email" autocomplete="email" placeholder="회신받으실 이메일 주소" />
                <p class="tc-field__err">올바른 이메일 주소를 입력해 주세요.</p>
              </div>
              <div class="tc-field">
                <label class="tc-field__label" for="tcCompany">회사 / 기관명 <span class="req">*</span></label>
                <input class="tc-input" id="tcCompany" name="company" type="text" autocomplete="organization" placeholder="예) OO식품, OO초등학교" />
                <p class="tc-field__err">회사 또는 기관명을 입력해 주세요.</p>
              </div>
              <div class="tc-field">
                <label class="tc-field__label" for="tcMsg">문의 내용</label>
                <textarea class="tc-textarea" id="tcMsg" name="message" placeholder="식수 규모, 도입 시기 등 궁금한 점을 남겨주세요."></textarea>
              </div>

              <div class="tc-hp" aria-hidden="true">
                <label>이 항목은 비워두세요 <input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
              </div>

              <button type="submit" class="btn btn--primary tc-submit">문의 보내기</button>
              <p class="tc-form__error" role="alert" hidden>전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>
              <p class="tc-form__foot">입력하신 정보는 문의 응대 목적에만 사용됩니다.</p>
            </form>
          </div>

          <div class="tc-modal__view tc-done" data-view="done" hidden>
            <div class="tc-done__badge">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h2 class="tc-done__title">문의가 접수되었습니다</h2>
            <p class="tc-done__msg">담당자가 확인 후 남겨주신 이메일로<br />빠르게 연락드리겠습니다. 감사합니다!</p>
            <button type="button" class="btn btn--primary tc-submit" data-contact-close>확인</button>
          </div>
        </div>
      </div>`;
  }

  mounted() {
    this.modal = this.$('.tc-modal');
    this.form = this.$('.tc-form');
    this.viewForm = this.$('[data-view="form"]');
    this.viewDone = this.$('[data-view="done"]');
    this.errorLine = this.$('.tc-form__error');
    this._lastFocus = null;
    this._openedAt = 0;

    // Global open/close delegation — triggers live outside this component.
    this._onDocClick = (e) => {
      if (e.target.closest('[data-contact-open]')) { e.preventDefault(); this.open(); return; }
      if (e.target.closest('[data-contact-close]')) this.close();
    };
    this._onKey = (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-open')) this.close();
    };
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('keydown', this._onKey);

    // Clear a field's error state as soon as the user edits it.
    this.form.addEventListener('input', (e) => {
      const f = e.target.closest('.tc-field.has-error');
      if (f) f.classList.remove('has-error');
    });
    this.form.addEventListener('submit', (e) => this._submit(e));

    // Chain cleanup with the base class so document listeners are removed.
    const prev = this._cleanup;
    this._cleanup = () => {
      prev?.();
      document.removeEventListener('click', this._onDocClick);
      document.removeEventListener('keydown', this._onKey);
    };
  }

  field(name) { return this.form.elements.namedItem(name); }

  open() {
    if (this.modal.classList.contains('is-open')) return;
    this._lastFocus = document.activeElement;
    this.form.reset();
    this._clearErrors();
    this._showView('form');
    this.modal.hidden = false;
    void this.modal.offsetWidth;           // force reflow so the transition plays
    this.modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this._openedAt = Date.now();
    setTimeout(() => this.$('#tcName')?.focus(), 60);
  }

  close() {
    if (!this.modal.classList.contains('is-open')) return;
    this.modal.classList.remove('is-open');
    setTimeout(() => {
      this.modal.hidden = true;
      document.body.style.overflow = '';
      this.form.reset();
      this._clearErrors();
      this._showView('form');
      if (this._lastFocus && this._lastFocus.focus) this._lastFocus.focus();
    }, 220);
  }

  _showView(view) {
    this.viewForm.hidden = view !== 'form';
    this.viewDone.hidden = view !== 'done';
  }

  _clearErrors() {
    this.$$('.tc-field.has-error').forEach((f) => f.classList.remove('has-error'));
    if (this.errorLine) this.errorLine.hidden = true;
  }

  _validate() {
    const name = this.field('name');
    const email = this.field('email');
    const company = this.field('company');
    let ok = true;
    const flag = (el, bad) => {
      el.closest('.tc-field').classList.toggle('has-error', bad);
      if (bad) ok = false;
    };
    flag(name, name.value.trim().length === 0);
    flag(email, !EMAIL_RE.test(email.value.trim()));
    flag(company, company.value.trim().length === 0);
    if (!ok) this.$('.tc-field.has-error .tc-input')?.focus();
    return ok;
  }

  _submit(e) {
    e.preventDefault();
    if (!this._validate()) return;

    // Honeypot: real users leave this hidden field empty; bots fill it.
    const hp = this.$('input[name="website"]');
    if (hp && hp.value) { this.close(); return; }

    const name = this.field('name').value.trim();
    const email = this.field('email').value.trim();
    const company = this.field('company').value.trim();
    const message = this.field('message').value.trim();

    const subject = `[도입문의] ${company} · ${name}`;
    const body = [
      `이름: ${name}`,
      `이메일: ${email}`,
      `회사/기관: ${company}`,
      '문의내용:',
      message || '(없음)',
    ].join('\n');
    const elapsed = Date.now() - this._openedAt;

    const btn = this.$('.tc-form .tc-submit');
    btn.disabled = true;
    btn.textContent = '보내는 중…';
    if (this.errorLine) this.errorLine.hidden = true;

    const api = window.API;
    const send = (api && typeof api.Site_SendEmailToAdmin === 'function')
      ? api.Site_SendEmailToAdmin(subject, body, elapsed)
      : Promise.reject(new Error('API.Site_SendEmailToAdmin is unavailable in this runtime'));

    Promise.resolve(send)
      .then(() => this._showView('done'))
      .catch((err) => {
        console.error('[taspa-contact-modal]', err);
        if (this.errorLine) this.errorLine.hidden = false;
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = '문의 보내기';
      });
  }
}

customElements.define('taspa-contact-modal', TaspaContactModal);

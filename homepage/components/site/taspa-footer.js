// <taspa-footer> — landing footer.
import { TaspaElement } from '../base/taspa-element.js';

class TaspaFooter extends TaspaElement {
  render() {
    const year = new Date().getFullYear();
    return `
      <footer class="site-footer">
        <div class="site-footer__inner">
          <div>
            <a class="brand" href="/">
              <span class="brand__mark" aria-hidden="true">T</span>
              <span class="brand__name">TASPA</span>
            </a>
            <p class="site-footer__tag">남김없는 스마트 급식 운영 플랫폼. 식수 예측부터 정산·폐기 절감까지, 구내식당을 똑똑하게.</p>
          </div>
          <div class="site-footer__cols">
            <div class="site-footer__col">
              <h4>제품</h4>
              <a href="#features">기능</a>
              <a href="#impact">도입 효과</a>
            </div>
            <div class="site-footer__col">
              <h4>회사</h4>
              <a href="#">소개</a>
              <a href="#contact">문의하기</a>
            </div>
          </div>
        </div>
        <div class="site-footer__bottom">© ${year} TASPA. All rights reserved.</div>
      </footer>`;
  }
}

customElements.define('taspa-footer', TaspaFooter);

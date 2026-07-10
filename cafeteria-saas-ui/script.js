const roleMeta = {
  cafeteria: {
    navLabel: "식당관리자 메뉴",
    initial: "김",
    name: "김민지",
    role: "식당 관리자",
    title: "안녕하세요, 김민지님!",
    copy: "오늘의 식당 운영 현황을 한눈에 확인하세요.",
    menu: [
      ["🏠", "홈", "dashboard"],
      ["🔮", "식수 예측", "dashboard2"],
      ["🍱", "메뉴 선호도", "dashboard3"],
      ["🧾", "정산", "dashboard4"],
      ["📅", "부재 예정 내역", "absence"],
      ["🍽️", "식사 현황", "meal-status"],
      ["📈", "리포트", "report"],
      ["👥", "조직 관리", "organization"],
      ["⚙️", "설정", "settings"],
    ],
  },
  workspace: {
    navLabel: "회사관리자 메뉴",
    initial: "우",
    name: "우성욱",
    role: "회사 관리자",
    title: "안녕하세요, 우성욱님!",
    copy: "자사 직원의 이용 내역, 부재 일정, 급여 차감 예정액을 관리합니다.",
    menu: [
      ["🏠", "홈", "ws-dashboard"],
      ["👥", "직원 관리", "ws-employees"],
      ["📅", "부재 일정", "ws-absence"],
      ["🍽️", "자사 식사 현황", "ws-meals"],
      ["🧾", "정산 조회", "ws-settlement"],
      ["💳", "급여 차감 내역", "ws-deduction"],
      ["📈", "리포트", "ws-report"],
      ["⚙️", "회사 설정", "ws-settings"],
    ],
  },
  employee: {
    navLabel: "사용자 메뉴",
    initial: "김",
    name: "김지란",
    role: "사용자",
    title: "안녕하세요, 김지란님!",
    copy: "QR 체크인, 오늘 메뉴, 식사 기록과 만족도 의견을 남길 수 있습니다.",
    menu: [
      ["🏠", "홈", "emp-home"],
      ["📱", "QR 체크인", "emp-checkin"],
      ["🍱", "오늘 메뉴", "emp-menu"],
      ["📖", "내 식사 기록", "emp-history"],
      ["⭐", "만족도", "emp-rating"],
      ["💬", "VOC 작성", "emp-voc"],
      ["⚙️", "내 설정", "emp-settings"],
    ],
  },
};

const pageMeta = {
  dashboard2: {
    title: "식수 예측 대시보드",
    copy: "AI 예측 결과와 정확도 추이, 예측에 활성화된 지표와 보정 이력을 확인합니다.",
  },
  dashboard3: {
    title: "메뉴 선호도 예측",
    copy: "앱 투표(의향)와 식사 태깅(실제 선택)으로 실측한 선호도로 메뉴 A/B 비율과 준비량을 예측합니다.",
  },
  dashboard4: {
    title: "정산 대시보드",
    copy: "Meal Log와 계약 단가, 조직도 변경까지 자동 반영된 회사별 정산 현황입니다. 사람은 확정 승인만 하면 됩니다.",
  },
  prediction: {
    title: "식수 예측",
    copy: "과거 식수, 메뉴, 날씨, 부재 데이터를 반영한 예측과 준비 권장량을 확인합니다.",
  },
  absence: {
    title: "부재 예정 내역",
    copy: "휴가, 재택근무, 외근, 출장 데이터를 회사별로 확인하고 식수예측 반영 상태를 점검합니다.",
  },
  menu: {
    title: "메뉴 & 선호도",
    copy: "오늘 메뉴 반응, 회사별 선호도, VOC와 메뉴별 식수예측 영향을 함께 확인합니다.",
  },
  "meal-status": {
    title: "실시간 식사 현황",
    copy: "QR, 사원증, 수기 입력으로 생성되는 Meal Log와 예측 대비 이용률을 실시간으로 확인합니다.",
  },
  settlement: {
    title: "회사별 정산",
    copy: "Meal Log, 계약 단가, 정산 방식을 기준으로 회사별 청구액과 급여 차감 데이터를 생성합니다.",
  },
  report: {
    title: "운영 리포트",
    copy: "예측 정확도, 월 누적 식수, 잔반, 만족도와 주요 인사이트를 리포트로 정리합니다.",
  },
  organization: {
    title: "조직 관리",
    copy: "연결 회사, 관리자 권한, 직원 동기화와 초대 상태를 한곳에서 관리합니다.",
  },
  settings: {
    title: "식당 설정",
    copy: "운영 시간, 인증 방식, 예측 모델, 알림과 변경 이력을 설정합니다.",
  },
  "ws-employees": {
    title: "직원 관리",
    copy: "직원 등록, 인증 수단, HR 동기화 상태를 확인하고 미매핑 계정을 정리합니다.",
  },
  "ws-absence": {
    title: "부재 일정",
    copy: "휴가, 재택, 외근, 출장 일정을 등록하면 식당의 식수예측에 자동 반영됩니다.",
  },
  "ws-meals": {
    title: "자사 식사 현황",
    copy: "오늘 실시간 이용 현황과 일자별 추이를 회사 기준으로 확인합니다.",
  },
  "ws-settlement": {
    title: "정산 조회",
    copy: "Meal Log 기반 청구액과 월별 정산 상태, 계약 조건을 조회합니다.",
  },
  "ws-deduction": {
    title: "급여 차감 내역",
    copy: "직원별 식사 기록을 급여 차감 데이터로 확인하고 예외 건을 처리합니다.",
  },
  "ws-report": {
    title: "회사 리포트",
    copy: "월 누적 식수, 이용률, 만족도를 회사 기준으로 정리합니다.",
  },
  "ws-settings": {
    title: "회사 설정",
    copy: "정산 방식, HR 동기화, 알림과 관리자 권한을 설정합니다.",
  },
  "emp-checkin": {
    title: "QR 체크인",
    copy: "배식대 리더기에 QR을 스캔하면 식사 기록이 자동으로 생성됩니다.",
  },
  "emp-menu": {
    title: "오늘 메뉴",
    copy: "메뉴 투표는 식당의 준비량 예측에 반영되어 음식물 폐기를 줄입니다.",
  },
  "emp-history": {
    title: "내 식사 기록",
    copy: "식사 내역, 급여 차감 예정액, 이용 패턴을 확인합니다.",
  },
  "emp-rating": {
    title: "만족도 평가",
    copy: "별점과 한줄평은 메뉴 구성과 식당 운영 개선에 사용됩니다.",
  },
  "emp-voc": {
    title: "VOC 작성",
    copy: "메뉴, 위생, 운영에 대한 의견을 남기면 답변 상태를 확인할 수 있습니다.",
  },
  "emp-settings": {
    title: "내 설정",
    copy: "프로필, 알림, 계정 연동을 관리합니다.",
  },
};

const nav = document.querySelector("#role-nav");
const welcomeTitle = document.querySelector("#welcome-title");
const welcomeCopy = document.querySelector("#welcome-copy");
const profileInitial = document.querySelector("#profile-initial");
const profileName = document.querySelector("#profile-name");
const profileRole = document.querySelector("#profile-role");

function setActivePage(pageKey) {
  document.querySelectorAll(".page-view").forEach((view) => {
    view.classList.toggle("active", view.id === `${pageKey}-page`);
  });
}

function setWelcome(pageKey) {
  const meta = pageMeta[pageKey];
  if (meta) {
    welcomeTitle.innerHTML = `${meta.title}`;
    welcomeCopy.textContent = meta.copy;
  } else {
    const activeRole = document.querySelector(".role-tab.active")?.dataset.role || "cafeteria";
    welcomeTitle.innerHTML = `${roleMeta[activeRole].title}`;
    welcomeCopy.textContent = roleMeta[activeRole].copy;
  }
}

function bindNavClicks() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      const page = button.dataset.page;
      setWelcome(page);
      setActivePage(page);
    });
  });
}

function renderRole(roleKey) {
  const role = roleMeta[roleKey];

  nav.setAttribute("aria-label", role.navLabel);
  nav.innerHTML = role.menu
    .map(([icon, label, page], index) => {
      const active = index === 0 ? " active" : "";
      return `<button class="nav-item${active}" data-page="${page}" type="button"><span>${icon}</span>${label}</button>`;
    })
    .join("");

  profileInitial.textContent = role.initial;
  profileName.textContent = role.name;
  profileRole.textContent = role.role;
  welcomeTitle.innerHTML = `${role.title}`;
  welcomeCopy.textContent = role.copy;
  setActivePage(role.menu[0][2]);
  bindNavClicks();
}

document.querySelectorAll(".role-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".role-tab").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    renderRole(button.dataset.role);
  });
});

document.querySelectorAll(".star-row").forEach((row) => {
  const stars = [...row.querySelectorAll("button")];
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      stars.forEach((item, i) => item.classList.toggle("on", i <= index));
    });
  });
});

document.querySelectorAll(".vote-grid").forEach((grid) => {
  const cards = [...grid.querySelectorAll(".vote-card")];
  cards.forEach((card) => {
    card.querySelector(".vote-button")?.addEventListener("click", () => {
      cards.forEach((item) => {
        const selected = item === card;
        item.classList.toggle("selected", selected);
        const button = item.querySelector(".vote-button");
        if (button) button.textContent = selected ? "투표 완료 ✓" : "이 메뉴로 투표";
      });
    });
  });
});

renderRole("cafeteria");

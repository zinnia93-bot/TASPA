const pageButtons = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page-view');
const roleButtons = document.querySelectorAll('.role-tab');
const profileRole = document.getElementById('profile-role');
const todayDate = document.getElementById('today-date');
const welcomeTitle = document.getElementById('welcome-title');
const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

function setActivePage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });

  pageButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });
}

function setActiveRole(role) {
  roleButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.role === role);
  });

  let roleLabel = '식당 관리자';
  let welcomeSuffix = '오늘의 식당 운영 현황을 한눈에 확인하세요.';

  if (role === 'workspace') {
    roleLabel = '회사 관리자';
    welcomeSuffix = '회사 전체 식수와 정산 현황을 관리하세요.';
  } else if (role === 'employee') {
    roleLabel = '사용자';
    welcomeSuffix = '나의 식사 일정과 메뉴를 빠르게 확인하세요.';
  }

  profileRole.textContent = roleLabel;
  welcomeTitle.textContent = `안녕하세요, 김지현님! ${roleLabel} 페이지에 오신 것을 환영합니다! ⌁`;
  document.getElementById('welcome-copy').textContent = welcomeSuffix;
}

pageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActivePage(button.dataset.page);
  });
});

roleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveRole(button.dataset.role);
  });
});

menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-open');
});

function formatKoreanDate(date) {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const weekday = weekdays[date.getDay()];
  return `${year}.${month}.${day} (${weekday})`;
}

function init() {
  setActivePage('dashboard-page');
  setActiveRole('cafeteria');
  todayDate.textContent = formatKoreanDate(new Date());
}

init();

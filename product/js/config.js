// Shared, page-agnostic config: roles and their navigation.
// Nav paths are real Namo page paths (flat), matched against location.pathname.

export const ROLES = [
  { id: 'cafeteria', label: '식당 관리자' },
  { id: 'workspace', label: '회사 관리자' },
  { id: 'employee', label: '사용자' },
];

// Each nav item: { path, label, icon, roles }
// `roles` omitted -> visible to all roles.
export const NAV = [
  { path: '/',            label: '대시보드',   icon: '▣' },
  { path: '/prediction',  label: '식수 예측',  icon: '⌁', roles: ['cafeteria', 'workspace'] },
  { path: '/menu',        label: '메뉴 관리',  icon: '♨', roles: ['cafeteria'] },
  { path: '/report',      label: '리포트',     icon: '✎', roles: ['cafeteria', 'workspace'] },
  { path: '/settings',    label: '설정',       icon: '⚙' },
];

export function navForRole(roleId) {
  return NAV.filter((item) => !item.roles || item.roles.includes(roleId));
}

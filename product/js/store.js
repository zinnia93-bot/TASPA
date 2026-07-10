// Shared client state (role + user), persisted to localStorage and broadcast
// via a DOM event so any component can react without a framework.
import { ROLES } from './config.js';

const KEY = 'taspa.state';

const defaults = {
  role: 'cafeteria',
  user: { name: '김지현', role: '식당 관리자', initial: '김' },
};

let state = { ...defaults };

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    state = { ...defaults, ...raw, user: { ...defaults.user, ...(raw.user || {}) } };
  } catch {
    state = { ...defaults };
  }
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

function emit() {
  document.dispatchEvent(new CustomEvent('taspa:statechange', { detail: getState() }));
}

export function initStore() {
  load();
  // Reflect the active role's default user label if none stored yet.
  const role = ROLES.find((r) => r.id === state.role);
  if (role) state.user.role = state.user.role || role.label;
  emit();
}

export function getState() {
  return { ...state, user: { ...state.user } };
}

export function setRole(roleId) {
  if (!ROLES.some((r) => r.id === roleId)) return;
  const role = ROLES.find((r) => r.id === roleId);
  state = { ...state, role: roleId, user: { ...state.user, role: role.label } };
  save();
  emit();
}

export function subscribe(fn) {
  const handler = (e) => fn(e.detail);
  document.addEventListener('taspa:statechange', handler);
  fn(getState()); // fire immediately with current state
  return () => document.removeEventListener('taspa:statechange', handler);
}

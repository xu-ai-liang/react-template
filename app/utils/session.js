const token = 'token';

// 设置 token
export function setToken(v) {
  sessionStorage.setItem(token, v);
}

// 获取 token
export function getToken() {
  return sessionStorage.getItem(token);
}

// 清除 token
export function clearToken(v) {
  return sessionStorage.clear(v);
}

export function signUp(email, password) {
  sessionStorage.setItem(email, JSON.stringify({ email, password }));
  return true;
}

export function login(email, password) {
  const user = JSON.parse(sessionStorage.getItem(email));
  if (user && user.password === password && user.email === email) {
    sessionStorage.setItem('user', JSON.stringify({ email }));
    return true;
  }
  return false;
}

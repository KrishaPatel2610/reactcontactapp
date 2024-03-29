// src/AuthService.js
class AuthService {
  signUp(email, password) {
    sessionStorage.setItem(email, JSON.stringify({ email, password }));
    return true;
  }

  login(email, password) {
    const user = JSON.parse(sessionStorage.getItem(email));
    if (user && user.password === password && user.email === email) {
      sessionStorage.setItem('user', JSON.stringify({ email }));
      return true;
    }
    return false;
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true;
  },
  onLogout() {
    this.isLoggedIn = false;
  },
  getLogInStatus() {
    return this.isLoggedIn;
  }
}


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          authentication.onAuthentication();
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    authentication.onLogout();
  }

  register(fullname, username, email, password) {
    return axios.post(API_URL + "signup", {
      fullname,
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

}

export default new AuthService();

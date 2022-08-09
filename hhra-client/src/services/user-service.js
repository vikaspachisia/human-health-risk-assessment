import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3001/api/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAdminList() {
    return axios.get(API_URL + 'adminlist', { headers: authHeader() });
  }

  getVolunteerList() {
    return axios.get(API_URL + 'volunteerlist', { headers: authHeader() });
  }
}

export default new UserService();

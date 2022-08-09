import http from "./http-common";

class PatientInfoService {
  getPatientCount() {
    return http.get("/patients/count");
  }

  getAll(limit) {
    return http.get(`/patients?limit=${limit}`);
  }

  get(id) {
    return http.get(`/patients/${id}`);
  }

  create(data) {
    return http.post("/patients", data);
  }

  update(id, data) {
    return http.put(`/patients/${id}`, data);
  }

  delete(id) {
    return http.delete(`/patients/${id}`);
  }

  deleteAll() {
    return http.delete(`/patients`);
  }

  searchByName(name) {
    return http.get(`/patients?searchbyname=${name}`);
  }
};

export default new PatientInfoService();

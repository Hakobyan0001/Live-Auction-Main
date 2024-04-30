import axios from "axios";
const baseApiUrl = "http://localhost:8080";

class BaseRESTService {
  token = "";

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  run(rout, options) {
    let headers = {
      "Content-Type": "application/json",
    };

    if (options.headers) {
      headers = { ...headers, ...options.headers };
    }

    if (this.token) {
      headers.Authorization = "Bearer " + this.token;
    }

    const config = {
      method: options.method,
      url: baseApiUrl + rout,
      data: options.data,
      headers,
    };

    if (options.params) {
      config.params = options.params;
    }
    return axios(config);
  }
}

export default new BaseRESTService();

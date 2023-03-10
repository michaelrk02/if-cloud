import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    var message = '';
    if (String(error.response.status).match(/4[0-9][0-9]/) !== null) {
      if ((typeof(error.response.data) !== 'undefined') && (typeof(error.response.data.message) !== 'undefined')) {
        message = ': ' + error.response.data.message;
      }
    }
    alert('An error occured' + message);

    return Promise.reject(error);
  }
);

export default api;

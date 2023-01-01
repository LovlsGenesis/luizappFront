import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.110:3000/api/',
  headers: {
    'Application-Token': '123456',
  },
});

export default api;

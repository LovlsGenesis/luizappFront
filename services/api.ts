import axios from 'axios';

const prod = 'https://luizapp-production.up.railway.app';
const dev = 'http://192.168.15.110:3000';

const api = axios.create({
  baseURL: `${prod}/api/`,
  headers: {
    'Application-Token':
      'eyJhbGciOiJIUzI1NiJ9.e30.SKlnwApfio_3G2uK7-HBLn1YWB6dI4OVR-WxVSGW5GI',
  },
});

export default api;

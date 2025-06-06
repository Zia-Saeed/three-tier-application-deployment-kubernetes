import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
      ? '/api/' 
      : '<your service name or service exposed url>/api/accounts',
    withCredentials: true,
  });

export default api;

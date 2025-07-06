import axios from 'axios';

export const apiUrl = import.meta.env.API_URL;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

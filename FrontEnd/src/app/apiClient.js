import axios from 'axios';
import { store } from './store';
import { logout } from '../features/auth/authSlice';
import { isTokenExpired } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',  
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response, 
  error => {
    const { response } = error;
    const token = localStorage.getItem('token'); 

    if (response && response.status === 401) {
      if (token && isTokenExpired(token)) {
        store.dispatch(logout()); 
        navigate("/dashboard"); 
    }
    }
    return Promise.reject(error); 
  }
);

export default apiClient;

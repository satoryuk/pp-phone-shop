import axios from 'axios';

const API_URL = 'http://localhost:3000/user/auth';
// const API_URL2 = 'http://localhost:3000/user/functionality';



export const signIn = async ({ email, password }) => {
  return axios.post(`${API_URL}/login`, { email, password });
};
export const register = async ({ profile, username, email, password }) => {
    const formData = new FormData();
    formData.append('profile', profile);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
  
    return axios.post(`${API_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
};
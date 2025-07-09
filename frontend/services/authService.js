import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

// Signup function
export async function signup(userData) {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("data is",response.data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Login function
export async function login(credentials) {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

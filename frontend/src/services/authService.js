import axios from 'axios';

const API_URL = 'http://localhost:7000/api/v1/user';

// Signup function
export async function signUp(userData) {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("data is",response);
    return response;
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
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

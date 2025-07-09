import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust the backend URL and port as needed

// Helper function to get auth token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
}

// Add a new company
export async function addCompany(companyData) {
  try {
    const response = await axios.post(`${API_URL}/companies`, companyData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Delete a company by ID
export async function deleteCompany(companyId) {
  try {
    const response = await axios.delete(`${API_URL}/companies/${companyId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Get all companies
export async function getCompanies() {
  try {
    const response = await axios.get(`${API_URL}/companies`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

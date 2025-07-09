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

// Add a new referral person
export async function addReferralPerson(referralPersonData) {
  try {
    const response = await axios.post(`${API_URL}/add`, referralPersonData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Get referral persons for company
export async function getReferralPersons() {
  try {
    const response = await axios.get(`${API_URL}/list`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Get referral persons by company ID
export async function getReferralPersonsByCompany(companyId) {
  try {
    const response = await axios.get(`${API_URL}/listByCompany/${companyId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

// Delete referral person by ID
export async function deleteReferralPerson(referralPersonId) {
  try {
    const response = await axios.delete(`${API_URL}/delete/${referralPersonId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

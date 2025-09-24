import axios from "axios";

const API_URL = "http://localhost:7000/api/v1/company";

export async function registerCompany (companyData) {
  try {
    const response = await axios.post(`${API_URL}/register`, companyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error.response ?error.response.data: error;
    // console.log("error are", error);
  }
};

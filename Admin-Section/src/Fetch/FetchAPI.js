import axios from "axios";

const API_URL_Auth = "http://localhost:3000/auth";
// const API_URL2 = 'http://localhost:3000/user/functionality';
const API_URL_Admin = "http://localhost:3000/admin";

export const signIn = async ({ email, password }) => {
  return axios.post(`${API_URL_Auth}/login`, { email, password });
};
export const register = async ({ profile, username, email, password }) => {
  const formData = new FormData();
  formData.append("profile", profile);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  return axios.post(`${API_URL_Auth}/signup`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const productData = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/getAllProduct`);
    return response.data; // return the data from the response
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
};
export const adminLogin = async ({ email, password }) => {
  try {
    // Prepare the data to be sent as JSON
    const data = { email, password };

    // Send a POST request with JSON data
    const response = await axios.post(`${API_URL_Auth}/adminLogin`, data, {
      headers: {
        "Content-Type": "application/json", // Use JSON for the body content
      },
    });

    // Return the response (can be useful to handle the response in the component)
    return response.data;
  } catch (error) {
    console.error("Login error:", error);

    // If the error is an Axios error, handle it accordingly
    if (error.response) {
      // Server responded with an error status code
      return error.response.data;
    } else {
      // Other errors (e.g., network issues)
      return { message: "An error occurred, please try again." };
    }
  }
};
export const productHeaderData = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/productHead`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const dashboardHeaderData = async (date) => {
  try {
    const response = await axios.get(`${API_URL_Admin}/dashboardHead`, {
      params: { date }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export const dashboardHeaderAll = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/dashboardHeadAll`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export const tableByDate = async (date) => {

  try {
    const response = await axios.get(`${API_URL_Admin}/getAllProductbydate`, {
      params: { date: date }
    })

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const categoryFetch = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/category`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const tableByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL_Admin}/getAllProductbyCategory`, {
      params: category
    });
    console.log(category);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const searchFetch = async (items) => {
  try {
    const response = await axios.get(`$${API_URL_Admin}/searchProduct`, {
      params: items
    })
    return response;
  } catch (error) {
    console.log(error);

  }
}
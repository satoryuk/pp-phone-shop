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

    return response;
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

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const searchFetch = async (searchData) => {
  try {
    console.log(searchData);

    const response = await axios.get(`${API_URL_Admin}/searchProduct`, {
      params: searchData
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const addNewProductAPI = async (formdata) => {
  const formData = new FormData();

  // Append non-file data to formData
  formData.append("name", formdata.name);
  formData.append("brand", formdata.brand);
  formData.append("price", formdata.price);
  formData.append("date", formdata.date);
  formData.append("processor", formdata.processor);
  formData.append("storage", formdata.storage);
  formData.append("camera", formdata.camera);
  formData.append("category", formdata.category);
  formData.append("description", formdata.description);
  formData.append("stock", formdata.stock);
  formData.append("screenSize", formdata.screenSize);
  formData.append("ram", formdata.ram);
  formData.append("battery", formdata.battery);

  // Convert `colors` array to a JSON string and append it
  formData.append("colors", JSON.stringify(formdata.colors));

  // Append `images` (files) to formData
  for (let image of formdata.images) {
    formData.append("images", image); // The key `images` must match the backend
  }

  try {
    const response = await axios.post(`${API_URL_Admin}/addNewProduct`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure this matches your backend
      },
    });
    return response;
    // console.log(formdata);


  } catch (error) {
    console.log(error);

  }
}
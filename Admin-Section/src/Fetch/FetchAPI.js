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
    withCredentials: true
  });
};
export const productData = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/getAllProduct`, { withCredentials: true });
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
      withCredentials: true
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
    const response = await axios.get(`${API_URL_Admin}/productHead`, { withCredentials: true });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const dashboardHeaderData = async (date) => {
  try {
    const response = await axios.get(`${API_URL_Admin}/dashboardHead`, {
      params: { date },
      withCredentials: true
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export const dashboardHeaderAll = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/dashboardHeadAll`, { withCredentials: true });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export const tableByDate = async (date) => {

  try {
    const response = await axios.get(`${API_URL_Admin}/getAllProductbydate`, {
      params: { date: date },
      withCredentials: true
    })

    return response;
  } catch (error) {
    console.log(error);
  }
}

export const categoryFetch = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/category`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const tableByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL_Admin}/getAllProductbyCategory`, {
      params: category,
      withCredentials: true
    });


    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const searchFetch = async (searchData) => {
  try {
    if (typeof searchData !== "object" || searchData === null) {
      throw new TypeError("searchData must be a valid object.");
    }

    const response = await axios.get(`${API_URL_Admin}/searchProduct`, {
      params: searchData,
      withCredentials: true
    });

    return response.data; // Explicitly return data
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data.data);
    } else if (error.request) {
      console.error("No Response:", error.request);
    } else {
      console.error("Setup Error:", error.message);
    }
    throw error; // Re-throw error if the caller needs to handle it
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
      withCredentials: true
    });
    return response;
    // console.log(formdata);


  } catch (error) {
    console.log(error);

  }
}
export const addNewBrandAPI = async (formdata) => {

  try {
    const response = await axios.post(`${API_URL_Admin}/addNewBrand`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    });
    return response;
  } catch (error) {
    console.log(error);


  }
}
export const addNewCategoryAPI = async (category) => {
  try {
    const response = await axios.post(`${API_URL_Admin}/addNewCategory`, { category }, { withCredentials: true });
    console.log("Response:", response.data); // Debugging logs
    return response;
  } catch (error) {
    console.error("Error in addNewCategoryAPI:", error);
    throw error;
  }
};
export const removeOneFetch = async (deleteid) => {
  try {
    const response = await axios.delete(`${API_URL_Admin}/deleteProduct`, {
      params: deleteid,
      withCredentials: true
    })
    return response;


  } catch (error) {
    console.log(error);

  }
}
export const loginFetch = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL_Auth}/adminLogin`, { email, password }, { withCredentials: true });
    // return response.data; // Return the response payload
    console.log(response);

  } catch (error) {
    console.error("Error during login request:", error.message);
    if (error.response) {
      console.error("Server responded with status:", error.response.status);
      console.error("Server response data:", error.response.data);
    }
    const serverMessage = error.response?.data?.message || "Login failed";
    throw new Error(serverMessage); // Pass server errors up the chain
  }
};

export const logoutFetch = async () => {
  try {
    const response = await axios.post(`${API_URL_Auth}/adminLogout`, {}, { withCredentials: true })
    return response;
  } catch (error) {
    console.log(error);
  }
}
export const OrderTableFetch = async () => {
  try {
    const response = await axios.get(`${API_URL_Admin}/tableOrder`, {
      withCredentials: true, // Move withCredentials to the second argument
    });
    return response;
  } catch (error) {
    console.error("Error fetching order table:", error);
  }
};


export const productByID = async (id) => {
  try {
    const response = await axios.get(`${API_URL_Admin}/searchProductByID/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

import axios from "axios";

const API_URL_COMMON = "http://localhost:3000/common";
const API_URL_USER = "http://localhost:3000/user";

export const fetchdataProduct = async () => {
    try {
        const response = await axios.get(`${API_URL_COMMON}/getAllProduct`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const fetchProductByName = async ({ phone_name }) => {
    try {
        const response = await axios.get(`${API_URL_COMMON}/getProduct?phone_name=${phone_name}`)
        // console.log({ phone_name });

        return response.data;
    } catch (error) {
        console.log(error);

    }
}
export const fetchProductDiscount = async () => {
    try {
        const response = await axios.get(`${API_URL_COMMON}/offerDisplay`);

        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const fetchProductByDate = async () => {
    try {
        const response = await axios.get(`${API_URL_COMMON}/getAllProductbydate?date=1`);
        return response.data;
    } catch (error) {
        console.log(error);

    }
}
export const fetchCategory = async () => {
    try {
        const response = await axios.get(`${API_URL_COMMON}/category`);
        return response.data;
    } catch (error) {
        console.log(error);

    }
}
export const fetchSearchDataByName = async ({ phone_name }) => {
    try {
        const response = await axios.get(`${API_URL_COMMON}/getAllProductByName?phone_name=${phone_name}`)
        return response.data;
    } catch (error) {
        console.log(error);

    }
}
export const fetchProductByCategory = async ({ category }) => {
    try {
        const response = await axios.get(`${API_URL_COMMON}/getAllProductbyCategory?category=${category}`);
        return response.data;
    } catch (error) {
        console.error(error);

    }
}
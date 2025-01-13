// Authentication for Auth Api
export const AUTHENDPOINT = {
    LOGIN: "auth/login",
    REGISTER: "auth/register"
}
//common endpoint 
export const COMMONENDPOINT = {
    GET_NOTIFICATIONS: "common/notification",
}
export const USERENDPOINT = {
    GET_ORDER: "user/orderByName",
}

// BaseURL for our api localhost 
export const NETWORK_CONFIG = {
    apiBaseUrl: import.meta.env.VITE_REACT_APP_BASE_URL
};
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = Cookies.get('access-token');

    console.log("Token in PrivateRoute:", token); // Debugging log

    useEffect(() => {
        if (!token) {
            console.log("No token found, redirecting to login."); // Debugging log
            navigate('/auth/login'); // Redirect to login if not authenticated
        }
    }, [token, navigate]);

    return token ? children : null; // Only render children if authenticated
};

export default PrivateRoute;

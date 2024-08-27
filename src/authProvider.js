import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.clear();
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login page after logout
    };

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000; // Convert to seconds
                    if (decodedToken.exp < currentTime) {
                        handleLogout(); // Clear token and redirect
                    } else {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                    handleLogout(); // Handle invalid token
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        checkToken();

        const intervalId = setInterval(checkToken, 60000); // Check every minute

        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, [handleLogout, navigate]); // Include handleLogout in dependency array
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider
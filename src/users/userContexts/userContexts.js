import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// Create Context
export const UserContext = createContext();

// Create Provider Component
export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    // Function to fetch user profile from API or local storage
    const fetchUserProfile = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await axios.get('https://myblog-backend-production.up.railway.app/api/profile', {
                 
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.data();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <UserContext.Provider value={{ profile, setProfile }}>
            {children}
        </UserContext.Provider>
    );
};

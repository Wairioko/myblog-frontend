import React, { createContext, useState, useEffect } from 'react';

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
                const response = await fetch('http://localhost:4000/api/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
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

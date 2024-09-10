import { useNavigate } from "react-router-dom";
import { EditProfile } from "../services/userServices";
import { useState, useEffect } from "react";

export const useEditProfile = (initialUsername = '') => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(initialUsername);

    // Fetch the initial username here if necessary
    useEffect(() => {
        // Assuming you have a function to get the current user's data
        const fetchUserData = async () => {
            const userData = await getUserData(); // Define getUserData elsewhere
            setUsername(userData.username);
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload
        try {
            await EditProfile({ username });
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update profile', error);
            alert("Unable to edit profile. Please try again later.");
        }
    };

    return { username, setUsername, handleSubmit };
};

import { useNavigate } from "react-router-dom";
import { EditProfile } from "../services/userServices";
import { useState, useEffect } from "react";

export const useEditProfile = (initialUsername = '') => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(initialUsername);

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

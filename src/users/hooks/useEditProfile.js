import { Navigate, useParams } from "react-router-dom";
import {EditProfile} from "../services/userServices";
import { useState } from "react";


export const useEditProfile = () => {
    const navigate = Navigate();
    const [username, setUsername] = useState('');
    const handleSubmit = () => {
        EditProfile(username)
        navigate('/profile')
    }
    return {username, setUsername, handleSubmit}
}
 
import { Navigate, useParams } from "react-router-dom";
import {EditProfile} from "../services/userServices";
import { useState } from "react";


export const useEditProfile = () => {
    const navigate = Navigate();
    const id = useParams();
    const [username, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = EditProfile(id, username)
        navigate('/')
    }
    return {username, setUsername, handleSubmit}
}
 
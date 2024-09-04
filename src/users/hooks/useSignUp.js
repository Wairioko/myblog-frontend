import { useState } from "react";
import { Navigate } from "react-router-dom";
import {UserSignUp} from "../services/userServices";

const useSignUp = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = Navigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {username, email, password}
        UserSignUp(userData)
        navigate('/')
        
    }
    
    return {email, setEmail, username, setUsername, password, setPassword, handleSubmit}
}
 
export default useSignUp;
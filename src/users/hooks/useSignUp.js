import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserSignUp} from "../services/userServices";

const useSignUp = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {username, email, password}
        UserSignUp(userData)
        navigate('/')
        
    }
    
    return {email, setEmail, username, setUsername, password, setPassword, handleSubmit}
}
 
export default useSignUp;
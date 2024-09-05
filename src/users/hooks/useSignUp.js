import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignUp } from "../services/userServices";

const useSignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const userData = { username, email, password };
        await UserSignUp(userData).then((data) => {
            if(data){
                navigate('/')
            }
        })
           
        
    };

    return { email, setEmail, username, setUsername, password, setPassword, handleSubmit, error };
};

export default useSignUp;

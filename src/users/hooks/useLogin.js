import { useState } from "react";
import {LoginUser} from "../services/userServices"
import { useNavigate } from "react-router-dom";




const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {email, password}
        LoginUser(userData).then((data) => {
            if(data){
                navigate('/')
            }
        })

    }

    return {email, setEmail, password, setPassword, handleSubmit}
}
 
export default useLogin;





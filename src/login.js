import { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginUser = async (userData) => {
    return fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then((response) => {
        if(response.ok) {
            return response.json(); // Return the response to the caller
        } else {
            throw new Error('Login failed');
        }
    })
    .then((data) => {
        localStorage.setItem('authToken', data.token); // Store the token in localStorage
        alert('Login Successful');
        return data;
    })
    .catch((error) => {
        alert("Unable to Login");
        console.log(error.message);
        return null;
    });
}



const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };

        loginUser(userData).then((data) => {
            if (data) {
                navigate('/'); // Redirect to home page on successful login
            }
        });
    }

    return (         
        <div className="login-page">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login Page</h1>
                <label>Email</label>
                <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value='Login' />
            </form>
        </div>
    );
}

export default UserLogin;



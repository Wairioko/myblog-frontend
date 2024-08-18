import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:4000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                alert('Sign-up successful');
                resolve(data);
            } else {
                alert('Sign-up failed:');
                console.log(data.message);
                reject(new Error(data.message));
            }
        })
        .catch((error) => {
            alert(error);
            console.error('Error:', error);
            reject(error);
        });
    });
}

const UserSignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate  =  useNavigate();

    // This is the handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way
        const userData = { username, email, password }; // Gather the form data
        registerUser(userData).then((data) => {
            if (data) {
                navigate('/'); // Redirect to home page on successful login
            }
        });
    }

    useEffect(() => {
        const handlePopState = () => {
            window.location.reload();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [])

    return ( 
        <div className="signup-page">
            <form onSubmit={handleSubmit} className="signup-form">
                <h1>User Registration</h1>
                <label>Username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                    required
                />
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required
                />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}

export default UserSignUp;

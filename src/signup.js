import React, { useState } from 'react';

const registerUser = (userData) => {
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
            // Store the token in localStorage or sessionStorage
            localStorage.setItem('authToken', data.token);

            // Update the app's authentication state
            setAuthState({ isAuthenticated: true, token: data.token });

            alert('Sign-in successful');
        } else {
            alert('Sign-in failed:');
            console.log(data.message)
        }
    })
    .catch((error) => {
        alert(error)
        console.error('Error:', error);
    });
}

const UserSignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // This is the handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way
        const userData = { username, email, password }; // Gather the form data
        registerUser(userData); // Call the function to register the user
    }

    return ( 
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
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

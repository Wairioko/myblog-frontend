import './index.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {!token && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
                {token && (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/create-blog">Create Blog</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;

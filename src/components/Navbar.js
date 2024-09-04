import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authProvider';

const Navbar = () => {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);

    return (
        <nav>
            <div className="nav-left">
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
            <div className="nav-center">
                <Link to={'/'}>
                    <h1>MY BLOG</h1>
                </Link>
            </div>
            <div className="nav-right">
                <ul>
                    {!isAuthenticated && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/create-blog">Create Blog</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

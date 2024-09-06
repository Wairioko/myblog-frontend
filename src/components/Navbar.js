import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../authProvider';


const Navbar = () => {
    const { isAuthenticated, handleLogout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/">Home</Link>
                </div>
                <div className="nav-center">
                    <Link to={'/'}>
                        <h1>MY BLOG</h1>
                    </Link>
                </div>
                <button className="nav-toggle" onClick={toggleMenu}>☰</button>
                <div className={`nav-right ${isMenuOpen ? 'active' : ''}`}>
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
            </div>
        </nav>
    );
}


export default Navbar;
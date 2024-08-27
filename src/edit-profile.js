import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useEditProfile = (username) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) return;

        fetch('http://localhost:4000/api/edit-profile', {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 'username': username })
        })
        .then(response => response.json())
        .then(data => {
            setData(data);
            alert("User Profile updated successfully")
            navigate('/profile')
        })
        .catch(error => {
            console.error('Error:', error);
            setError(error);
        });
    }, [username, token]);

    return { data, error };
};

const ProfileChangePage = () => {
    const [username, setUsername] = useState('');
    const [submittedUsername, setSubmittedUsername] = useState('');
    const { data, error } = useEditProfile(submittedUsername);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedUsername(username);
    };

    return (
        <div className="edit-profile">
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="username-label">
                    Username:
                </label>
                <input 
                    type="text" 
                    id="username" 
                    className="username-input" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>

            {data && <p>Profile updated: {data.name}</p>}
            {error && <p>Error updating profile: {error.message}</p>}
        </div>
    );
};

export default ProfileChangePage;


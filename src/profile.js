import { useState, useEffect } from "react";


const useProfile = () => {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/profile', {
                    
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                });

                
                const data = await response.data();
                setProfile(data);
                
            } catch (error) {
                setError("Error fetching profile data: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { profile, error, loading };
};


const handleEditProfile = () => {
    window.location.href = '/edit-profile';
};


const ProfilePage = () => {
    const { profile, error, loading } = useProfile();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            <h1 className="profile-header">Profile Page</h1>
            <p className="profile-info">Welcome to your profile page!</p>
            <div className="profile-info">
                <p>Name: {profile.username}</p>
                <p>Email: {profile.email}</p>
            </div>
            <button onClick={handleEditProfile} className="edit-profile-button">Edit Profile</button>
        </div>
    );
};

export default ProfilePage;



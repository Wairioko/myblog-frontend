import useGetProfile from "../hooks/useGetProfile";

const ProfilePage = () => {
    const { profile, handleEditProfile, loading, error } = useGetProfile();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading profile: {error.message}</p>;

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

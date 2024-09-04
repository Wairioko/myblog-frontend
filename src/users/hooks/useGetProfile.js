import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetProfile } from "../services/userServices";

const useGetProfile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await GetProfile();
                setProfile(profileData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProfile();
    }, []); // Empty dependency array means this runs once on mount

    const handleEditProfile = () => {
        navigate('/navigate');
    };

    return { profile, handleEditProfile, loading, error };
};

export default useGetProfile;

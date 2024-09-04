import { useState, useEffect } from 'react';
import {getAllBlogs} from  '../services/blogService';


export const useGetAllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(
        () => {
            const fetchBlogs = async () => {
                try {
                    setLoading(true);
                    setError(false);
                    const blogs = await getAllBlogs();
                    setBlogs(blogs);
                    setLoading(false);
                } catch (error) {
                    setError(true);
                    setLoading(false);
                }
            }
            fetchBlogs();
        }, [])
    return {blogs, error, loading}
};




import { useState, useEffect } from "react";
import { getBlogById } from "../services/blogService";


export const UseGetBlog = (id) => {
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(id);
                setBlog(data);
            } catch (error) {
                setError(error.message || 'Something went wrong');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return { blog, isLoading, error };
};

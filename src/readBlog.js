import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BlogPost = () => {
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate() // Use useNavigate for navigation

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/blog/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setBlog(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        const handlePopState = () => {
            localStorage.removeItem('blogToUpdate');
        };

        window.addEventListener('popstate', handlePopState);

        fetchBlog();

        // Cleanup function
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [id]);

    const handleDelete = async () => {
        // Prompt the user for confirmation
        const confirmDeletion = window.confirm("Are you sure you want to delete this blog?");

        if (!confirmDeletion) return; // Exit if the user cancels

        try {
            const response = await fetch(`http://localhost:4000/api/delete-blog/${blog._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/'); // Navigate to homepage after deletion
        } catch (error) {
            console.error("Error deleting blog:", error);
            setError(error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!blog) return <div>No blog found</div>;

    return (
        <div className="blog-post">
            <h1>{blog.title}</h1>
            <p className="author">Posted by {blog.author}</p>
            <p className="description">{blog.description}</p>
            <div className="content">
                {blog.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <div className="update-delete-container">
                <button name='delete' onClick={handleDelete}>Delete Blog</button>
                <button
                    name="update-blog"
                    onClick={() => {
                        localStorage.setItem('blogToUpdate', JSON.stringify(blog));
                        navigate(`/update-blog/${blog._id}`);
                    }}>
                    Update Blog
                </button>
            </div>
        </div>
    );
};

export default BlogPost;
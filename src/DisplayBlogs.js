import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 3;

const GetBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/blogs', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setBlogs(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBlogs = blogs.slice(startIndex, endIndex);

    // Calculate total pages
    const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="blogs-content">
            {currentBlogs.map((blog) => (
                <Link to={`/blog/${blog._id}`} key={blog._id}>
                    <div className="blog-preview">
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                        <p className="author">Posted by {blog.author}</p>
                    </div>
                </Link>
            ))}

            <div className="pagination-controls">
                <button name="previous" onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button name="next"onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default GetBlogs;

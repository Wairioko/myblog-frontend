import {useGetAllBlogs} from "../hooks/useGetAllBlogs";
import React, {useState} from "react";
import { Link } from "react-router-dom";


const ITEMS_PER_PAGE = 3;

const GetBlogs = () => {
    const { blogs, loading, error } = useGetAllBlogs();
    const [currentPage, setCurrentPage] = useState(1);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>; 

    if (!blogs || blogs.length === 0) {
        return <div>No blogs available</div>;
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBlogs = blogs.slice(startIndex, endIndex);
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
                <button
                    name="previous"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    name="next"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
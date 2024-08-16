import React from "react";
// import useGetBlogs from "./GetBlogs";
// import { Link } from "react-router-dom";
const getBlogs = () => {
    fetch('http://localhost:4000/api/blogs', {
        method: "GET", 
        headers: { "context-type": "application/json"}
    })
    .then((response) => {
        if(response.ok){
            return response.json()
        }
    })
    .catch((error) => {
        alert("Unable to get Blogs")
        console.log(error);
    })

}
const GetBlogs = () => {
    // const { data, isPending, fetchError } = useGetBlogs('http://localhost:4000/api/blogs');
    const data = getBlogs();
    return (
        <div className="blogs-content">
            {/* {fetchError && <p>Error fetching blog data: {fetchError.message}</p>}
            {isPending && <p>Loading...</p>} */}
            
            {data && data.map((blog) => (
                <div className="blog-preview" key={blog._id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.description}</p>
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
}

export default GetBlogs;


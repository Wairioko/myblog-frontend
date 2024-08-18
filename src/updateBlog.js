import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const blogUpdate = (blogID, blogData, navigate) => {
    const token = localStorage.getItem('authToken');
    
    fetch(`http://localhost:4000/api/update-blog/${blogID}`, 
        {   
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(blogData)
        }
    )
    .then(response => response.json())
    .then(data => {
        alert("Blog updated successfully");
        localStorage.removeItem('blogToUpdate');
        console.log(data);
        navigate(`/blog/${blogID}`, { replace: true });
    })
    .catch(error => {
        alert("Unable to update Blog");
        console.log(error.message);
    });
}

const UpdateBlog = () => {
    const blog = JSON.parse(localStorage.getItem('blogToUpdate'));
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState(blog.title || '');
    const [description, setDescription] = useState(blog.description || '');
    const [content, setContent] = useState(blog.content || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlogData = { title, description, content };
        blogUpdate(id, newBlogData, navigate);
    }

    useEffect(() => {
        const handlePopState = () => {
            localStorage.removeItem('blogToUpdate');
            window.location.reload();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (  
        <div className="update-blog">
            <form onSubmit={handleSubmit} className="update-blog-form">
                <label>Title</label>
                <input 
                    value={title} 
                    type="text" 
                    name="title" 
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <label>Description</label>
                <input 
                    value={description} 
                    type="text" 
                    name="description" 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                
                <label>Content</label>
                <textarea 
                    value={content} 
                    type="text" 
                    name="content" 
                    onChange={(e) => setContent(e.target.value)} 
                />
                
                <input 
                    type="submit" 
                    name="update-button" 
                    value="Update Blog"
                />
            </form>
        </div>
    );
}
 
export default UpdateBlog;

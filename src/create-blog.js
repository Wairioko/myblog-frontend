import { useState } from "react";

const createBlog = (blogData) => {
    const token = localStorage.getItem('jwtToken');
    fetch('http://localhost:4000/api/create-blog', 
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(blogData)
        }
    )
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to create blog');
        }
    })
    .then((data) => {
        alert("Blog created successfully!");
        console.log(data);
    })
    .catch((error) => {
        alert("Error creating blog");
        console.log(error.message);
    });
}

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('authToken');
        if (token) {
            const author = token; // Set author as the token
            const blogData = { title, description, content, author };
            createBlog(blogData);
        } else {
            alert("You need to be logged in to create a blog.");
        }
    }

    return (
        <div className="create-blog">
            <h1>Create Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
                <label>Description</label>
                <input type="text" value={description} required onChange={(e) => setDescription(e.target.value)} />
                <label>Content</label>
                <textarea value={content} required onChange={(e) => setContent(e.target.value)} />
                <input type="submit" value="Create Blog" />
            </form>
        </div>
    );
}

export default CreateBlog;

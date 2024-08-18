import { useState, useEffect } from "react";

const createBlog = (blogData) => {
    const token = localStorage.getItem('authToken'); // Use 'jwtToken' consistently
    fetch('http://localhost:4000/api/create-blog', 
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}` // Ensure the token is correctly formatted
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
        
        const token = localStorage.getItem('authToken'); // Use 'jwtToken' consistently
        if (token) {
            
            const blogData = { title, description, content };
            createBlog(blogData);
        } else {
            alert("You need to be logged in to create a blog.");
        }
    }

    useEffect(() => {
        const handlePopState = () => {
            window.location.reload();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [])

    return (
        <div className="create-blog">
            
            <form className="create-blog-form" onSubmit={handleSubmit}>
                <h1>Create Blog</h1>
                <label>Title</label>
                <input type="text" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                <label>Description</label>
                <input type="text" name="description"value={description} required onChange={(e) => setDescription(e.target.value)} />
                <label>Content</label>
                <textarea value={content} name="content" required onChange={(e) => setContent(e.target.value)} />
                <input type="submit" value="Create Blog" />
            </form>
        </div>
    );
}

export default CreateBlog;

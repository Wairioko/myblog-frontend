import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlogService } from "../services/blogService";

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('authToken');
        if (token) {
            const blogData = { title, description, content, images };
            createBlogService(blogData, token)
                .then((data) => {
                    alert("Blog created successfully!");
                    console.log(data);
                    navigate('/');
                })
                .catch((error) => {
                    alert(`Error creating blog: ${error.message}`);
                    console.log(error.message);
                });
        } else {
            alert("You need to be logged in to create a blog.");
        }
    }

    return (
        <div className="create-blog">
            <form className="create-blog-form" onSubmit={handleSubmit}>
                <h1>Create Blog</h1>
                <label>Title</label>
                <input type="text" name="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                <label>Description</label>
                <input type="text" name="description" value={description} required onChange={(e) => setDescription(e.target.value)} />
                <label>Content</label>
                <textarea value={content} name="content" required onChange={(e) => setContent(e.target.value)} />
                
                <label>Choose image(s):</label>
                <input type="file" id="image" name="images" accept="image/*" multiple onChange={handleImageChange} />
                <input type="submit" value="Create Blog" />
            </form>
        </div>
    );
}

export default CreateBlog;

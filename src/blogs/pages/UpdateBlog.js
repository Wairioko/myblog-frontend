import { useUpdateBlog } from "../hooks/useUpdateBlog";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


const UpdateBlog = () => {
    const location = useLocation();
    const [blog, setBlog] = useState({
        title: '',
        description: '',
        content: '',
        images: []
    });

    const {
        setTitle, 
        setContent, 
        setDescription, 
        handleImageChange, 
        handleRemoveExistingImage, 
        handleSubmit, 
        loading, 
        existingImageUrls = [] // Default to an empty array if undefined
    } = useUpdateBlog();

    // Set initial blog data when component mounts or location changes
    useEffect(() => {
        if (location.state?.blog) {
            const { title, description, content, images } = location.state.blog;
            setBlog({
                title: title || '',
                description: description || '',
                content: content || '',
                images: images || []
            });
        }
    }, [location.state?.blog]);

    // Handle change in title
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (  
        <div className="update-blog">
            <form onSubmit={handleSubmit} className="update-blog-form">
                <label>Title</label>
                <input 
                    value={blog.title} 
                    type="text" 
                    name="title" 
                    onChange={handleChange}
                />
                
                <label>Description</label>
                <input 
                    value={blog.description} 
                    type="text" 
                    name="description" 
                    onChange={handleChange}
                />
                
                <label>Content</label>
                <textarea 
                    value={blog.content} 
                    name="content" 
                    onChange={handleChange}
                />
                
                {existingImageUrls.length > 0 && (
                    <div>
                        <label>Existing Images:</label>
                        {existingImageUrls.map((url, index) => (
                            <div key={index}>
                                <img src={url} alt={`Existing ${index}`} style={{width: '100px', height: '100px'}} />
                                <button type="button" onClick={() => handleRemoveExistingImage(url)}>Remove</button>
                            </div>
                        ))}
                    </div>
                )}
                
                <label>Choose new images (up to {2 - existingImageUrls.length}):</label>
                <input 
                    type="file" 
                    id="image" 
                    name="images" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange} 
                    disabled={existingImageUrls.length >= 2}
                />
                
                <input 
                    type="submit" 
                    name="update-button" 
                    value={loading ? "Updating..." : "Update Blog"} 
                    disabled={loading}
                />
            </form>
        </div>
    );
}

export default UpdateBlog;

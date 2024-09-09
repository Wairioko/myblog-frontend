import { useUpdateBlog } from "../hooks/useUpdateBlog";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


const UpdateBlog = () => {
    const location = useLocation();
    const {
        title,
        description,
        content,
        setTitle,
        setContent,
        setDescription,
        handleImageChange,
        handleRemoveExistingImage,
        handleSubmit,
        loading,
        existingImageUrls = []
    } = useUpdateBlog();

    // Set initial blog data when component mounts or location changes
    useEffect(() => {
        if (location.state?.blog) {
            const { title, description, content, imageUrls } = location.state.blog;
            setTitle(title || '');
            setDescription(description || '');
            setContent(content || '');
            // If imageUrls are part of the blog, set them in the hook state
            if (imageUrls && imageUrls.length > 0) {
                handleRemoveExistingImage(imageUrls); // Update existing image URLs
            }
        }
    }, [location.state?.blog, setTitle, setDescription, setContent]);

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
                    name="content" 
                    onChange={(e) => setContent(e.target.value)}
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


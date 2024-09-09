import { useState, useEffect } from "react";
import { updateBlog } from "../services/blogService";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdateBlog = (blog = {}) => { // Add a default empty object for blog
    const { id } = useParams(); 
    const [title, setTitle] = useState(blog.title || '');
    const [description, setDescription] = useState(blog.description || '');
    const [content, setContent] = useState(blog.content || '');
    const [images, setImages] = useState([]);
    const [existingImageUrls, setExistingImageUrls] = useState(blog.imageUrls || []);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setLoading(true);
        
        const newBlogData = {
            title, description, content, images, imageUrls: existingImageUrls
        };

        try {
            
            await updateBlog(id, token ,newBlogData);
            navigate('/blog/' + id);

        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + existingImageUrls.length > 2) {
            alert("You can only have a maximum of 2 images in total");
            return;
        }
        setImages(selectedFiles);
    };
    
    const handleRemoveExistingImage = (urlToRemove) => {
        setExistingImageUrls(existingImageUrls.filter(url => url !== urlToRemove));
    };

    return {
        title,
        content,
        description,
        setDescription,
        setTitle,
        setContent,
        images,
        handleImageChange,
        handleRemoveExistingImage,
        handleSubmit,
        isLoading
    };
};

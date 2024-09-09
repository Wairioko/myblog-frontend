import { useState, useEffect } from "react";
import { updateBlog } from "../services/blogService";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdateBlog = (initialBlog = {}) => {
    const { id } = useParams();
    const [title, setTitle] = useState(initialBlog.title || '');
    const [description, setDescription] = useState(initialBlog.description || '');
    const [content, setContent] = useState(initialBlog.content || '');
    const [newImages, setNewImages] = useState([]);
    const [existingImageUrls, setExistingImageUrls] = useState(initialBlog.imageUrls || []);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const updatedFields = {};

        if (title !== initialBlog.title) updatedFields.title = title;
        if (description !== initialBlog.description) updatedFields.description = description;
        if (content !== initialBlog.content) updatedFields.content = content;
        
        if (newImages.length > 0) updatedFields.newImages = newImages;
        
        if (JSON.stringify(existingImageUrls) !== JSON.stringify(initialBlog.imageUrls)) {
            updatedFields.imageUrls = existingImageUrls;
        }

        try {
            console.log('Updating blog with ID:', id);
            console.log('Update data:', updatedFields);
            const updatedBlog = await updateBlog(id, updatedFields);
            console.log('Blog updated successfully:', updatedBlog);
            navigate('/blog/' + id);
        } catch (error) {
            console.error('Error updating blog:', error.message);
            setError(error.message);
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
        setNewImages(selectedFiles);
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
        newImages,
        existingImageUrls,
        handleImageChange,
        handleRemoveExistingImage,
        handleSubmit,
        isLoading,
        error
    };
};
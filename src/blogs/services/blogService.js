import axios from 'axios';

export const createBlogService = async (blogData, token) => {
    const formData = new FormData();
    for (const key in blogData) {
        if (key === 'images') {
            for (let i = 0; i < blogData.images.length; i++) {
                formData.append('images', blogData.images[i]);
            }
        } else {
            formData.append(key, blogData[key]);
        }
    }

    try {
        const response = await axios.post('https://myblog-backend-production.up.railway.app/api/create-blog', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;  // Axios automatically parses JSON
    } catch (error) {
        console.error('Error creating blog:', error.message);
        throw new Error(error.response?.data?.message || 'Failed to create blog');
    }
};

export const getAllBlogs = async () => {
    try {
        const response = await axios.get('https://myblog-backend-production.up.railway.app/api/blogs', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching blogs:', err.message);
        alert('Failed to get blogs');
        throw err;
    }
};

export const getBlogById = async (blogid) => {
    try {
        const response = await axios.get(`https://myblog-backend-production.up.railway.app/api/blog/${blogid}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching blog:', error.message);
        throw error;
    }
};

export const deleteBlog = async (blogid, token) => {
    try {
        const response = await axios.delete(`https://myblog-backend-production.up.railway.app/api/delete-blog/${blogid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert("Blog Successfully deleted");
        } else {
            alert('Unable to delete blog');
        }
    } catch (error) {
        console.error('Error deleting blog:', error.message);
        alert('Unable to delete Blog');
    }
};


export const updateBlog = async (blogid, blogData) => {
    const formData = new FormData();
    
    for (const key in blogData) {
        if (key === 'newImages') {
            for (let i = 0; i < blogData.newImages.length; i++) {
                formData.append('images', blogData.newImages[i]);
            }
        } else if (key === 'imageUrls') {
            formData.append('imageUrls', JSON.stringify(blogData.imageUrls));
        } else {
            formData.append(key, blogData[key]);
        }
    }

    const token = localStorage.getItem('authToken');

    console.log(`Updating blog with ID: ${blogid}`);
    console.log('Update data:', Object.fromEntries(formData));

    try {
        const response = await axios.put(`https://myblog-backend-production.up.railway.app/api/update-blog/${blogid}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            console.log("Blog updated successfully", response.data);
            return response.data;
        } else {
            throw new Error(`Failed to update blog: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Error updating blog:', error.message);
        throw error;
    }
};



 


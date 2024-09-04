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

    return fetch('http://localhost:4000/api/create-blog', {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    .then(async (response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(err => {
                throw new Error(err.message || 'Failed to create blog');
            });
        }
    });
};

export const getAllBlogs = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/blogs', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Log and return the data
        console.log(data);
        return data;

    } catch (err) {
        console.error('Error:', err);
        alert('Failed to get blogs');
    }
};

export const getBlogById = async (blogid) => {
    try {
        const response = await fetch(`http://localhost:4000/api/blog/${blogid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Unable to fetch Blog');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;  // Rethrow the error to be caught in UseGetBlog
    }
};



export const deleteBlog = (blogid, token) => {
  
    return (  
        fetch(`http://localhost:4000/api/blog/delete/${blogid}`, {
            method:`DELETE`,
            contentType: 'application/json',
            Authentication: `Bearer ${token}`
        })
        .then(response => {
            if(response.ok){
                alert("Blog Successfully deleted");
                return response.json

            }else(
                alert('Unable to delete blog')
            )
        })
        .then(data => {
            return data
        })
        .catch((error) => {
            console.log(error.message);
            alert('Unable to delete Blog')

        })
    );
}


export const updateBlog = async (blogData, token, blogid) => {
    const formData = new FormData();
    for (const key in blogData){
        if(key === 'images'){
            for (let i=0; i < blogData.images.length; i++){
                formData.append('images', blogData.images[i])
            }
        }else if(key === 'imageUrls'){
            formData.append('imageUrls', JSON.stringify(blogData.imageUrls));
        } else{
            formData.append(key, blogData[key])
        }
    }
    try {
        const response = await fetch(`http://localhost:4000/api/update-blog/${blogid}`, 
        {   
            method: 'PUT', 
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("Blog updated successfully");

        } else {
            alert(`Failed to update blog: ${data.message}`);
        }
    } catch (error) {
        alert("Unable to update Blog");
        console.log(error.message);
    }
}
 

 


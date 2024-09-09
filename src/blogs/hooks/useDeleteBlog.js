import {getBlogById, deleteBlog} from '../services/blogService'



// Delete blog hook
const useDeleteBlog = async (id, token) => {
    const confirmDeletion = window.confirm("Continue with deleting blog?");
    if (!confirmDeletion) return;

    try {
        await deleteBlog(blog._id, token);
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

export default useDeleteBlog;
import {getBlogById, deleteBlog} from '../services/blogService'


const useDeleteBlog = async (id, token) => {
    const confirmDeletion = window.confirm("Continue with deleting blog?")
    if(!confirmDeletion) return;
    try {
        const blog = getBlogById(id)
        await deleteBlog(blog._id, token)
        
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
   
}
 
export default useDeleteBlog;
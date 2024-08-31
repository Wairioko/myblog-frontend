import createBlogService from "../services/blogService";


export const createBlogHook = (blogData, token) => {
    
    return createBlogService(blogData, token)
}



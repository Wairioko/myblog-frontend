import { useParams, useNavigate } from "react-router-dom";
import { UseGetBlog } from "../hooks/useGetBlog";
import UseDeleteBlog from "../hooks/useDeleteBlog";
import { useContext } from 'react';
import { UserContext } from "../../users/userContexts/userContexts";


const DisplayBlog = () => {

  const { profile } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const { blog, isLoading, error } = UseGetBlog(id);

  const onDelete = async () => {
    const { blogid } = useParams();
    const authtoken = localStorage.getItem('authToken');
    const success = await UseDeleteBlog(blogid, authtoken);
    if (success) {
        navigate('/');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>No blog found</div>;


  
  const canEditOrDelete = token && profile.username === blog.author;
  console.log("this is the author of the blog ", profile.username);

  const renderContent = () => {
    if (!blog.content) return null;

    const paragraphs = blog.content.split('\n').filter(para => para.trim() !== '');
    const middleIndex = Math.floor(paragraphs.length / 2);

    return paragraphs.map((paragraph, index) => (
      <div key={index} className="paragraph-container">
        <p>{paragraph}</p>
        {index === middleIndex && blog.imageUrls && blog.imageUrls[1] && (
          <img
            src={blog.imageUrls[1]}
            alt=""
            className="image-inline"
            style={{ display: 'block', margin: '20px auto' }}
          />
        )}
      </div>
    ));
  };


  return (
    <div className="blog-post">
      <h1>{blog.title}</h1>
      {blog.imageUrls && blog.imageUrls[0] && (
        <img src={blog.imageUrls[0]} alt="" className="image-large" />
      )}
      <p className="author">Posted by {blog.author}</p>
      <p className="description">{blog.description}</p>
      <div className="content">{renderContent()}</div>
      {canEditOrDelete && (
        <div className="update-delete-container">
          <button name="delete" onClick={onDelete}>Delete Blog</button>
          <button
            name="update-blog"
            onClick={() => navigate(`/update-blog/${blog._id}`, { state: { blog } })}
          >
            Update Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplayBlog;
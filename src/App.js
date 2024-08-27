import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider  from './authProvider';
import Navbar from './Navbar.js';
import GetBlogs from './DisplayBlogs.js';
import UserSignUp from './signup.js';
import UserLogin from './login.js';
import CreateBlog from './create-blog.js';
import BlogPost from './readBlog.js';
import UpdateBlog from './updateBlog.js';

import ProfilePage from './profile.js';
import ProfileChangePage from './edit-profile.js';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<GetBlogs />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/update-blog/:id" element={<UpdateBlog />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/edit-profile' element={<ProfileChangePage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


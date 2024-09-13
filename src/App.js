import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider  from './authProvider';
import Navbar from './components/Navbar.js';
import GetBlogs from '../src/blogs/pages/GetAllBlogs.js';
import SignUpPage from '../src/users/pages/signup.js';
import LoginPage from '../src/users/pages/login.js';
import CreateBlog from '../src/blogs/pages/CreateBlog.js';
import GetBlog from '../src/blogs/pages/GetBlog.js';
import UpdateBlog from '../src/blogs/pages/UpdateBlog.js';
import ProfilePage from '../src/users/pages/profile.js';
import EditProfilePage from '../src/users/pages/editProfile.js';


function App() {
  return (
   
    <AuthProvider>
        <Router>
          <Navbar />
            <Routes>
              <Route path="/" element={<GetBlogs />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/blog/:id" element={<GetBlog />} />
              <Route path="/update-blog/:id" element={<UpdateBlog />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/edit-profile' element={<EditProfilePage />} />
            </Routes>
        </Router>
    </AuthProvider>
    
  );
}

export default App;


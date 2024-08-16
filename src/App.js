import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar.js';
import GetBlogs from './DisplayBlogs.js';
import UserSignUp from './signup.js';
import UserLogin from './login.js';
import CreateBlog from './create-blog.js';


function App() {
  return (
    
    <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<GetBlogs />} />
                <Route path="/signup" element={<UserSignUp />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/create-blog" element={<CreateBlog />} />
            </Routes>
    </Router>
    
  );
}

export default App;

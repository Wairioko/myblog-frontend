
## Overview
This is the frontend for the Blog application built with React. It allows users to create, view, update, and delete blog posts, as well as manage their profiles. The frontend interacts with the Node.js backend server to perform CRUD operations.

## Features
- **User Authentication:** Log in and sign up functionality integrated with JWT authentication.
- **Blog Management:** Create, edit, view, and delete blog posts.
- **Profile Management:** Update user profiles and manage account settings.
- **Responsive Design:** The app is designed to be responsive and work across various screen sizes.

## Tech Stack
- **React.js** - Frontend library
- **React Router** - For handling routing in the application
- **fetch** - For making HTTP requests to the backend API

## Setup Instructions

### Prerequisites
- Node.js and npm/yarn installed
- The backend server should be running

### Installation
1. **Clone the repository:**
   ```bash
   git clone (https://github.com/Wairioko/myblog-frontend).git
   cd myblog-frontend
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
Routing
The app uses React Router for navigation. Below are the primary routes:

/ - Home page displaying a list of blog posts.
/login - Login page for user authentication.
/signup - Sign-up page for new users.
/blogs/:id - View a single blog post.
/blogs/create-blog - Create a new blog post (only for authenticated users).
/blogs/update-blog/:id - Edit a blog post (only for authenticated users).
/profile - User profile management page (only for authenticated users).

## API Integration
## Authentication
POST /auth/register - Register a new user.
POST /auth/login - Log in to receive a JWT token.
## Blog Management
GET /blogs - Retrieve all blog posts.
GET /blogs/:id - Retrieve a single blog post.
POST /create-blog - Create a new blog post.
PUT /blogs/:id - Update a blog post.
DELETE /blogs/:id - Delete a blog post.

## User Profile
GET /users/:id - Get user profile.
PUT /users/:id - Update user profile.
DELETE /users/:id - Delete user profile.

## Styling
The app uses CSS Modules for component-specific styles and global styles for common elements.

Global styles: Located in the styles folder, providing basic styling for the entire app.
Component-specific styles: Each component has its own style file, allowing for modular and maintainable CSS.
Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and create a pull request. Make sure to follow the existing code style and include tests where necessary.

## License
This project is licensed under the MIT License.

## Contact
For any queries or issues, reach out to [charlesmungai5@gmail.com].


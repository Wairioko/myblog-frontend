import axios from "axios";

export const LoginUser = async (userData) => {
    try {
        const response = await axios.post('https://myblog-backend-production.up.railway.app/api/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = response.data;
        localStorage.setItem('authToken', data.token); // Store the token in localStorage
        alert('Login Successful');
        return data;

    } catch (error) {
        alert("Unable to Login");
        console.error(error.message);
        return null;
    }
};

export const UserSignUp = async (userData) => {
    try {
        const response = await axios.post('https://myblog-backend-production.up.railway.app/api/signup', userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = response.data;
        alert("SignUp successful");
        localStorage.setItem("authToken", data.token);
        return data;

    } catch (error) {
        alert("Unable to Sign Up");
        console.error(error.message);
        return null;
    }
};

export const GetProfile = async () => {
    const token = localStorage.getItem("authToken");

    try {
        const response = await axios.get('https://myblog-backend-production.up.railway.app/api/profile', {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;  // Axios automatically parses the JSON response

    } catch (error) {
        console.error("Unable to fetch Profile:", error.message);
        throw error;
    }
};

export const EditProfile = async (newUsername) => {
    const token = localStorage.getItem("authToken");

    try {
        const response = await axios.put(`https://myblog-backend-production.up.railway.app/api/edit-profile`, newUsername, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;

    } catch (error) {
        alert("Unable to edit Profile");
        console.error(error.message);
        throw error;
    }
};

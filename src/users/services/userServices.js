import axios from "axios";

export const LoginUser = async (userData) => {
    return axios.post('https://myblog-backend-production.up.railway.app:4000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then((response) => {
        if(response.ok) {
            return response.json(); // Return the response to the caller
        } else {
            throw new Error('Login failed');
        }
    })
    .then((data) => {
        localStorage.setItem('authToken', data.token); // Store the token in localStorage
        alert('Login Successful');
        return data;
    })
    .catch((error) => {
        alert("Unable to Login");
        console.log(error.message);
        return null;
    });
}



export const UserSignUp = (userData) => {
    return (  
        axios.post('https://myblog-backend-production.up.railway.app:4000/api/users/signup', 
            {
                method: "POST",
                headers: {
                    "contentType": "application/json",
                    
                },
                body: JSON.stringify(userData), 
            })
            .then((response) => {
                return response
            })
            .then((data) => {
                alert("SignUp successful")
                localStorage.setItem("authToken", data.token)
                return data
            })
            .catch((error) => {
                alert("Unable to Login Successfully")
            })
    );
}
export const GetProfile = async () => {
    const token = localStorage.getItem("authToken");
    
    try {
        const response = await axios.get(`https://myblog-backend-production.up.railway.app:4000/api/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Unable to get profile data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Unable to fetch Profile:", error);
        throw error;
    }
};


export const EditProfile = (id, newUsername) => {
    const token = localStorage.getItem("authToken");
    
        axios.put(`https://myblog-backend-production.up.railway.app:4000/api/profile:${id}`, 
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "contentType": "application/json"
                },
                body: JSON.stringify(newUsername)
            })
            .then((response) => {
                if(!response.ok){
                    alert("Unable to get profile data")
                }
            })
            .then((data) => {
                return data
            })
            .catch((error) => {
                alert("Unable to fetch Profile")
                console.log(error.message)
            })


}



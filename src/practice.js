// import {useState} from "react"

import { useState } from "react"

// // service
// const CreateUser = async (userData) => {
//     fetch('some link to backend', 
//         {
//             method: 'POST',
//             headers: {
//                 ContentType: "application/json",

//             }, 
//             body: JSON.stringify(userData)
//         },
        
//     )
//     .then(
//         (response) => {
//             if(response.ok){
//                 return response.ok
//             }else{
//                 console.log("Unable to reach server")
                
//             }
        
//     })
//     .then((data) => {
//         return data
//     })
//     .catch((error) => {
//         console.log("Error creating user")
//         alert("Error creating user")
//     })
    
    
// }
 


// const useCreateUser = () => {
//     const [username, setUsername] = useState()
//     const [email, setEmail] = useState()
//     const [age, setAge] = useState()

//     const handleSubmit  = (e) => {
//         e.preventDefault()
//         const User = {username, email, age}
//         CreateUser(User)
        
//     }

//     return {username, setUsername, age, setAge, email, setEmail, handleSubmit}


// }






// const UserRegistration = () => {

//     const {username, setUsername, age, setAge, email, setEmail, handleSubmit} = useCreateUser();

    
//     return (  
//         <div>
//             <form className="user-registration" onSubmit={handleSubmit}>
//                 <label>Username</label>
//                 <input type="text" delerequired value={username} minLength={3} onChange={(e) => setUsername(e.target.value)}></input>
//                 <label>Email</label>
//                 <input type="email" min={15} max={65} required value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <label>Age</label> 
//                 <input type="text" required value={age} onChange={(e) => setAge(e.target.value)}/>
//                 <input type="submit" value="Register"></input>    
//             </form>
//         </div>

//     );
// }
 
// export default UserRegistration;



// // test for nested states
// const CreateUser = async (userData) => {
//     const formData = new FormData(
//         new URLSearchParams(userData)

//     )
//     try{
//     const reponse = fetch('some backend link', 
//         {
//             method: "POST", 
//             headers: {
                
//             },
//             body: formData
//         }
//     )
//     if(!reponse.ok){
//         alert("Unable to create User")
        
//     }
//     const data = await reponse.json()
//     return data
//     }
//     catch(error){
//         alert("Unable to create User")
//         console.log("Unable to create User", error.message)
//     }
    
// }


// const useFormValidation = (formData) => {
//     const [errors, setError] = useState();
//     const validateStep1 = () => {
//         const step1Errors = {};

//         if(formData.personalDetails.username.length < 3){
//             step1Errors.name = "Name must be longer than 3 letters"
//         }

//         return step1Errors;
//     }

//     const validateCurrentStep = (currentStep) => {
//         switch (currentStep) {
//             case 1:
//                 return validateStep1();
//             // Handle other steps...
//             default:
//                 return {};
//         }
//     };

//     return { errors, validateCurrentStep };
// }



// const userCreation = (initialState) => {

//     const [state, setState] = useState(initialState);

//     const updateField = (step, field, value) => {
//         setState(prevState => ({
//         ...prevState,
//         [step]: {
//             ...prevState[step],
//             [field]: value
//         }
//         }));
//     };

//     const addItem = (step, item) => {
//         setState(prevState => ({
//             ...prevState, 
//             [step]: [...prevState[step], item]
//         }))
//     }


//     const [formData, setFormData] = useState({
//         personalDetails: { username: '', email: '', age: '' },
//         addresses: [{ street: '', city: '', state: '', zipCode: '' }],
//         hobbies: [{ hobbyName: '', hobbyDescription: '' }]
//     });
    
//     const [currentStep, setCurrentStep] = useState();
//     const [errors, validateCurrentStep] = useFormValidation(formData);

    

//     const UserProfile = {
//         peronalDetails: {
//             username,
//             email,
//             age
//         }, 
//         addresses:[ {
//             street,
//             city,
//             state,
//             zipCode  
//         }
//     ],
//     hobbies: [
//         {
//             hobbyName,
//             hobbyDescription
//         }

//     ]
//     }

//     const validateInputs = () => {
//         const newErrors = {}


//         if(username.length < 3){
//             newErrors.username = "Username must be at least 3 characters long";
//         }

//         if(isNaN(age) || age <16 || age || 65){
//             newErrors.age = "Must be between 16 and 65";
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             newErrors.email = "Please enter a valid email address.";
//         }

//     }

//     const handleSave = (e) => {
//         e.preventDefault()
//         sessionStorage.setItem('userData', {UserProfile})
//         alert("User Profile saved successfully, You can continue editing later.")
//     }

//     const handleNext = () => {
//         const validationErrors = validateCurrentStep(currentStep);
//         if(Object.keys(validationErrors).length === 0){
//             setCurrentStep(currentStep + 1)
//         } else{
//             setErrors(validationErrors);
//         }
        
//     }

//     const handlePrevious = () => {
//         setCurrentStep(currentStep - 1);
//     }

//     const handleSubmit =  (e) => {
//         e.preventDefault()

//         if(!validateInputs()) return;
//         const user = UserProfile
//         CreateUser(user).then((data) => {
//             if(data){
//                 alert("User created Successfully");
//             }else{
//                 alert("Unable to Create UserProfile")
//             }
//         })
        
//     }

//     return { formData, handleNext, handlePrevious, handleSubmit, handleSave

//     }


// }




// const UserCreationPage = () => {
//     const {username, setUsername, email, setEmail, age, setAge, street, setStreet,
//         city, setCity, state, setState, zipCode, setZipCode, hobbyName, setHobbyName,
//         hobbyDescription, setHobbyDescription, handleSubmit,  handleSave} = userCreation()

//     return ( 

//         <div className="user-creation">
//             <form className="user-creation-form" onSubmit={handleSubmit} onAbort={handleSave}>
//                 <h1>User Profile</h1>
                
//                 <label>Username</label>
//                 <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} required />
//                 <label>Age</label>
//                 <input type="number"  required value={age} onChange={(e) => {setAge(e.target.value)}} />
//                 <label> Email</label>
//                 <input type="email" required value={email} onChange={(e)  => {setEmail(e.target.value)}} />
                
//                 <h1>Address Details</h1>
//                 <label>Street</label>
//                 <input type="text" required value={street} onChange={(e) => {setStreet(e.target.value)}} />
//                 <label>State</label>
//                 <input type="text" required value={state} onChange={(e) => {setState(e.target.value)}} />
//                 <label>City</label>
//                 <input type="text" required value={city} onChange={(e) => {setCity(e.target.value)}} />
//                 <label>Zipcode</label>
//                 <input type="number" required value={zipCode} onChange={(e) => {setZipCode(e.target.value)}} />
                

//                 <h1>Hobby</h1>
//                 <label>Hobby Name</label>
//                 <input type="text" required value={hobbyName} onChange={(e) => {setHobbyName(e.target.value)}} />
//                 <label>Hobby Description</label>
//                 <input type="text" required value={hobbyDescription} onChange={(e) => {setHobbyDescription(e.target.value)}} />

//                 <input type="submit" value="Submit" />
                
//             </form>
//         </div>

//     );
// }
 
// export default UserCreationPage;




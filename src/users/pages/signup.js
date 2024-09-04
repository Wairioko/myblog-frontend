import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
    const {username, setUsername, email, setEmail, password, setPassword, handleSubmit} = useSignUp();

    return ( 
        <div className="signup-page">
            <form onSubmit={handleSubmit} className="signup-form">
                <h1>User Registration</h1>
                <label>Username</label>
                <input 
                    type="text" 
                    name="username" 
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                    required
                />
                <label>Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required
                />
                <input type="submit" value="Sign Up" />
            </form>
        </div>

     );
}
 
export default SignUpPage;
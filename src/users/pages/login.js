import useLogin from "../hooks/useLogin";


const LoginPage = () => {
    const {email, setEmail, password, setPassword, handleSubmit} = useLogin();

    return (  
        <div className="login-page">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login Page</h1>
                <label>Email</label>
                <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value='Login' />
            </form>
        </div>
    );
}
 
export default LoginPage;
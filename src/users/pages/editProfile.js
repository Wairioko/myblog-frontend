import {useEditProfile} from "../hooks/useEditProfile"

export const EditProfilePage = () => {

    const {username, setUsername ,handleSubmit} = useEditProfile()

    return (
        <div className="edit-profile">
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="username-label">
                    Username:
                </label>
                <input 
                    type="text" 
                    id="username" 
                    className="username-input" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}



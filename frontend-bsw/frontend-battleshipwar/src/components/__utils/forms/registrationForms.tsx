
interface RegistrationFormsProps { 
    state: "signin" | "signup" | "playerList" | "twoTeams",
    setState: (state: "signin" | "signup" | "playerList" | "twoTeams") => void
}

const RegistrationForms = ({state, setState} : RegistrationFormsProps) => {

    const signinFormHandler = (e:React.FormEvent) => { 
        e.preventDefault()
        setState("playerList")
    }


    return ( 
        <>
            {state === 'signin' && <div className="mainPage_signinForm-modal">
                <div className="backdrop" />
                <form className="mainPage--signinForm" onSubmit={signinFormHandler}>
                    <label>Username</label><input type="text" />
                    <label>Password</label><input type="password" />
                    <button type="submit" className="original-button">SIGN IN</button>
                    <button type="button" className="link-button" onClick={() => setState("signup")}>New here? Sign Up now!</button>
                </form>
            </div>}

            {state === 'signup' && <div className="mainPage_signinForm-modal">
                <div className="backdrop" />
                <form className="mainPage--signinForm" onSubmit={signinFormHandler}>
                    <label>Username</label><input type="text" />
                    <label>Password</label><input type="password" />
                    <label>Confirm Password</label><input type="password" />
                    <button type="submit" className="original-button">SIGN IN</button>
                    <button type="button" className="link-button" onClick={() => setState("signin")}>Already a member? Sign In!</button>
                </form>
            </div>}
        </>
     );
}
 
export default RegistrationForms;
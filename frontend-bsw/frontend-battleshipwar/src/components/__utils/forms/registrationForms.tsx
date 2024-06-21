import { FormEvent } from 'react'
import socket from '../requests/socket'


interface RegistrationFormsProps { 
    state: "signin" | "signup" | "playerList" | "twoTeams",
    setState: (state: "signin" | "signup" | "playerList" | "twoTeams") => void
}

interface signInFormDataType {
    username: string,
    password: string
}

const RegistrationForms = ({state, setState} : RegistrationFormsProps) => {

    const signinFormHandler = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault()

        const signInFormData = new FormData(e.currentTarget);
        const signInDataObject: signInFormDataType = {
            username: signInFormData.get('username') as string,
            password: signInFormData.get('password') as string,
        }

        console.log(signInFormData)
        console.log({ username: signInDataObject.username, password: signInDataObject.password})

        socket.emit('signin-request', { username: signInDataObject.username, password: signInDataObject.password})

        // setState("playerList")
    }


    return ( 
        <>
            {state === 'signin' && <div className="mainPage_signinForm-modal">
                <div className="backdrop" />
                <form className="mainPage--signinForm" onSubmit={signinFormHandler}>
                    <label htmlFor='username'>Username</label><input name="username" id="username" type="text" />
                    <label htmlFor='password'>Password</label><input name="password" id="password" type="password" />
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
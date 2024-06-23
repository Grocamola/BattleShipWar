import { FormEvent } from 'react'
import socket from '../requests/socket'
import { useEffect } from 'react'
import { useUserContext } from '../hooks/username-context'


interface RegistrationFormsProps { 
    state: "signin" | "signup" | "playerList" | "twoTeams",
    setState: (state: "signin" | "signup" | "playerList" | "twoTeams") => void,
    players: string[]
}

interface signInFormDataType {
    username: string,
    password: string
}

interface signinResponseType {
    success: boolean,
    authData? : AuthData,
    error: string
}
interface AuthData {
    record: RecordData;
    token: string;
}

interface RecordData {
collectionId: string;
collectionName: string;
created: string;
email: string;
emailVisibility: boolean;
id: string;
updated: string;
username: string;
verified: boolean;
}

const RegistrationForms = ({state, setState, players} : RegistrationFormsProps) => {

    const {setUser} = useUserContext()


    const signinFormHandler = (e: FormEvent<HTMLFormElement>) => { 
        e.preventDefault()

        const signInFormData = new FormData(e.currentTarget);
        const signInDataObject: signInFormDataType = {
            username: signInFormData.get('username') as string,
            password: signInFormData.get('password') as string,
        }

        socket.emit('signin-request', { username: signInDataObject.username, password: signInDataObject.password})
    }

    useEffect(() => {
        const handleSigninResponse = (data: signinResponseType) => {
            if (data.success) {
                console.log(data.authData);
                setUser(data.authData!.record.username)
                if (players.length === 0) {
                    setState("playerList");
                }
            } else {
                console.log('something wrong is going on here ...');
            }
        };

        socket.on('signin-response', handleSigninResponse);

        return () => {
            socket.off('signin-response', handleSigninResponse);
        };
    }, [players.length, setState]);


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
                {/* <form className="mainPage--signinForm">
                    <label>Username</label><input type="text" />
                    <label>Password</label><input type="password" />
                    <label>Confirm Password</label><input type="password" />
                    <button type="submit" className="original-button">SIGN IN</button>
                    <button type="button" className="link-button" onClick={() => setState("signin")}>Already a member? Sign In!</button>
                </form> */}
            </div>}
        </>
     );
}
 
export default RegistrationForms;
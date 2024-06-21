import { useState } from "react";

import './mainPage.css'


const MainPage = () => {

    const [username, setUsername] = useState<string | undefined>()

    const signinFormHandler = (e:React.FormEvent) => { 
        e.preventDefault()
        setUsername('Jenna')
    }

    return ( 
        <>
            <div className="mainPage--container">
                
                {!username && <div className="mainPage_signinForm-modal">
                    <div className="backdrop" />
                    <form className="mainPage--signinForm" onSubmit={signinFormHandler}>
                        <label>Username</label><input type="text" />
                        <label>Password</label><input type="password" />
                        <button type="submit" className="original-button">SIGN IN</button>
                    </form>
                </div>}
            </div>
        </>
     );
}
 
export default MainPage;
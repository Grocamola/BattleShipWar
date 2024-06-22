import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import socket from '../__utils/requests/socket'

import RegistrationForms from "../__utils/forms/registrationForms";

import './mainPage.css'



const MainPage = () => {

    const navigate = useNavigate();

    const [players, setPlayers] = useState<string[]>([])
    const [state, setState] = useState<"signin" | "signup" | "playerList" | "twoTeams">("signin")


    const teamUpBtnHandler = () => { 
        setState("twoTeams")
        setPlayers(prev => shuffle(prev))
    }

    const shuffle = (array: string[]) => { 
        for (let i = array.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
    }; 

    useEffect(() => {
        const handleActiveUsers = (users: string[]) => {
            setPlayers([...users]);
            console.log("here: ", users);
        };

        socket.on("activeUsers", handleActiveUsers);
        
        return () => {
            socket.off("activeUsers", handleActiveUsers);
        };
    }, []);


    const startTheGameBtnHandler = () => { 
        // navigate to boards - TBD
        navigate('/boards');
    }

    return ( 
        <>
            <div className="mainPage--container">
                
                <RegistrationForms state={state} setState={setState} players={players} />

                {state === "playerList" && <div>
                    <div className="mainPage--playerList">
                        <h1>Players</h1>
                        <hr />
                        <ul>{players.map((player, index) => <li key={index}>{player}</li>)}</ul>
                    </div>
                </div>}
                {state === "playerList" && players.length > 6 && <button className="original-button" onClick={teamUpBtnHandler}>Team up</button>}

                {state === "twoTeams" && <div className="mainPage--twoteams">
                    <div className="team--attackers">
                        <h3>Team Attackers</h3><hr />
                        <ul>
                            {players.slice(0, Math.floor(players.length/2)).map(el => <p>{el}</p>)}
                        </ul>
                    </div>
                    <div className="team--defenders">
                        <h3>Team Defenders</h3><hr />
                        <ul>
                           {players.slice(Math.floor(players.length/2) + 1).map(el => <p>{el}</p>)} 
                        </ul>
                    </div>
                </div>}
                {state === "twoTeams" && <button className="original-button" onClick={startTheGameBtnHandler}>Start the game</button>}
            </div>
        </>
     );
}
 
export default MainPage;
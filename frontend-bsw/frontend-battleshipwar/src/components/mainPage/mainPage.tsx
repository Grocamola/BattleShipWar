import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import socket from '../__utils/requests/socket'
import { useUserContext } from "../__utils/hooks/username-context";
import RegistrationForms from "../__utils/forms/registrationForms";

import './mainPage.css'

interface shuffledTeamData {
    teamA: string[],
    teamD: string[]
}


const MainPage = () => {

    const navigate = useNavigate();

    const {state, setState} = useUserContext()

    const [players, setPlayers] = useState<string[]>([])
    const [attackers, setAttackers] = useState<string[]>([])
    const [defenders, setDefenders] = useState<string[]>([])
    
    const teamUpBtnHandler = () => { 
        socket.emit('shuffledTeam-request')
    }

    

    useEffect(() => {
        const handleActiveUsers = (users: string[]) => {
            setPlayers([...users]);
            // console.log("here: ", users);
        };

        const setPlayersToTeamHander = (data: shuffledTeamData) => { 
            console.log(data)
            setAttackers(data.teamA)
            setDefenders(data.teamD)
        }

        socket.on("activeUsers", handleActiveUsers);
        socket.on('shuffled-teams-response', setPlayersToTeamHander)
        socket.on('state-change', (data:"signin" | "twoTeams") => setState(data))
        
        return () => {
            socket.off("activeUsers", handleActiveUsers);
            socket.off('shuffled-teams-response', setPlayersToTeamHander);
            socket.off('state-change', (data:"signin" | "twoTeams") => setState(data))
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
                {state === "playerList" && players.length >= 2 && <button className="original-button" onClick={teamUpBtnHandler}>Team up</button>}

                {state === "twoTeams" && <div className="mainPage--twoteams">
                    <div className="team--attackers">
                        <h3>Team Attackers</h3><hr />
                        <ul>
                            {attackers.map(attacker => <p>{attacker}</p>)}
                        </ul>
                    </div>
                    <div className="team--defenders">
                        <h3>Team Defenders</h3><hr />
                        <ul>
                           {defenders.map(defender => <p>{defender}</p>)}
                        </ul>
                    </div>
                </div>}
                {state === "twoTeams" && <button className="original-button" onClick={startTheGameBtnHandler}>Start the game</button>}
            </div>
        </>
     );
}
 
export default MainPage;
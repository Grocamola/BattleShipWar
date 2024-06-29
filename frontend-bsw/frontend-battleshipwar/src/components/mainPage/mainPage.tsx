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

interface startTheGameResponseType { 
    attackersRoomId: string,
    defendersRoomId: string
}


const MainPage = () => {

    const navigate = useNavigate();

    const {user, state, setState} = useUserContext()

    const [players, setPlayers] = useState<string[]>([])
    const [attackers, setAttackers] = useState<string[]>([])
    const [defenders, setDefenders] = useState<string[]>([])
    
    const teamUpBtnHandler = () => { 
        socket.emit('shuffledTeam-request')
    }
    const startTheGameBtnHandler = () => { 
        socket.emit('startTheGame-request')
        // navigate('/boards');
    }

    useEffect(() => {
        const handleActiveUsers = (users: string[]) => setPlayers([...users]);

        const setPlayersToTeamHander = (data: shuffledTeamData) => { 
            console.log(data)
            setAttackers(data.teamA)
            setDefenders(data.teamD)
        }

        const startTheGameNavigationHandler = (data: startTheGameResponseType) => {
            console.log(data)
            console.log(`id: ${user}, attackers are: ${attackers}, defenders are: ${defenders}`)
            if(attackers.indexOf(user) > -1) { 
                navigate(`/boards-attackers/${data.attackersRoomId}`, {replace: true})
            } else if(defenders.indexOf(user) > -1) { 
                navigate(`/boards-defenders/${data.attackersRoomId}`, {replace: true})
            }
        }

        socket.on("activeUsers", handleActiveUsers);
        socket.on('shuffled-teams-response', setPlayersToTeamHander)
        socket.on('state-change', (data:"signin" | "twoTeams") => setState(data))
        socket.on('startTheGame-response', (data: startTheGameResponseType) => startTheGameNavigationHandler(data))
        
        return () => {
            socket.off("activeUsers", handleActiveUsers);
            socket.off('shuffled-teams-response', setPlayersToTeamHander);
            socket.off('state-change', (data:"signin" | "twoTeams") => setState(data))
            socket.off('startTheGame-response', (data: startTheGameResponseType) => startTheGameNavigationHandler(data))
        };
    }, []);


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

import { useMemo, useState } from 'react';
import './mainBoard.css'

const MainBoard = () => {

    const [boardStructure, setBoardStructure] = useState([
        [0,0,0,'Rock',0,0,0],
        [0,0,0,0,0,0,0],
        [0,'Rock',0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,'Rock',0,0],
        [0,0,0,0,0,0,0],
        [0,0,'Rock',0,0,0,0]
    ])

    const [attackersLocations, setAttackersLocations] = useState([[1,4], [3,5]])

    const defendHandler = (location: number[]) => {
        const tempBoardDefenders = [...boardStructure];
        console.log(tempBoardDefenders[location[0], location[1]])
    }

    useMemo(() => {
        const tempBoard = boardStructure;
        attackersLocations.map(location => tempBoard[location[0]][location[1]] = 'ship')
        setBoardStructure(tempBoard)
    },[attackersLocations])

    return ( 

        <>
            <div className="boardStructure">
                <ul>
                    {boardStructure.map(row => row.map(box => <li>{box === 0 ? "" : box}</li>))}
                </ul>
            </div>
            <button style={{marginTop: 50}} onClick={() => setAttackersLocations(prev => [...prev, [4,5]])}>Ships Attack</button>
            <button onClick={() => defendHandler([3,5])}>Defenders Stopp tham!</button>
        </>
     );
}
 
export default MainBoard;
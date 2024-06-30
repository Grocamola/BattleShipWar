import { useEffect, useState } from "react";
import socket from "../../__utils/requests/socket";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../__utils/hooks/username-context";

import mountain from '../../../assets/mountain.png'
import ship from '../../../assets/ship.png'
import arrow from '../../../assets/arrow.png'
import './board-attackers.css'



const BoardAttackers = () => {
  const { roomid } = useParams();
  const { user } = useUserContext();
  const [boardStructure, setBoardStructure] = useState<(string | number)[][]>([[],[],[]]);

  useEffect(() => {
    socket.emit('get-attackers-board');

    socket.on('attackers-board-response', (data) => {
      console.log('Received board data:', data);
      setBoardStructure(data.board);
    });

    return () => {
      socket.off('attackers-board-response');
    };
  }, [roomid]);

  const boxAttackHandler = (rowIndex: number, colIndex: number) => {
    console.log(`Clicked on row: ${rowIndex}, column: ${colIndex}`);
  
    const tempBoard = [...boardStructure];
  
    if (boardStructure[rowIndex][colIndex] === 'ship') {
      if (rowIndex > 0 && tempBoard[rowIndex - 1][colIndex] === 0) {
        tempBoard[rowIndex - 1][colIndex] = "UP";
      }
      if (rowIndex < 6 && tempBoard[rowIndex + 1][colIndex] === 0) {
        tempBoard[rowIndex + 1][colIndex] = "DOWN";
      }
      if (colIndex > 0 && tempBoard[rowIndex][colIndex - 1] === 0) {
        tempBoard[rowIndex][colIndex - 1] = "LEFT";
      }
      if (colIndex < 6 && tempBoard[rowIndex][colIndex + 1] === 0) {
        tempBoard[rowIndex][colIndex + 1] = "RIGHT";
      }
      setBoardStructure(tempBoard);
    } else if (
      boardStructure[rowIndex][colIndex] === 'UP' ||
      boardStructure[rowIndex][colIndex] === 'DOWN' ||
      boardStructure[rowIndex][colIndex] === 'LEFT' ||
      boardStructure[rowIndex][colIndex] === 'RIGHT'
    ) {
      // Handle the case where an option is clicked
      socket.emit('get-attackers-board');
    } else {
      // Reset the board if clicking anywhere else
      socket.emit('get-attackers-board');
    }
  };
  

  return (
    <>
      <p>WELCOME ATTACKERS!</p>
      <div>Room ID: {roomid}</div>
      <div>User: {user}</div>

      <div className="board-attackers--container">
      {boardStructure.map((row, rowIndex) => 
          row.map((box, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className="attackers__box" 
              onClick={() => boxAttackHandler(rowIndex, colIndex)}
            >
              {box === 0 ? null :
                box === "Rock" ? <img src={mountain} style={{ width: 70 }} alt='rock' /> :
                box === 'ship' ? <img src={ship} style={{ width: 70 }} alt='ship' /> :
                box === 'UP' ?  <img src={arrow} style={{ width: 50, margin: 10, transform: 'rotate(-90deg)' }} alt='up' /> :
                box === 'DOWN' ? <img src={arrow} style={{ width: 50, margin: 10, transform: 'rotate(90deg)' }} alt='down' /> :
                box === 'LEFT' ? <img src={arrow} style={{ width: 50, margin: 10, transform: 'rotate(180deg)' }} alt='left' /> :
                box === 'RIGHT' ? <img src={arrow} style={{ width: 50, margin: 10 }} alt='right' /> :
                null}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BoardAttackers;

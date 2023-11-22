import './App.css';
import { useState } from 'react';

function Cell({ value }) {
  return <div className='board-cell'>{ value }</div>;
}

function Board({ boardCells }) {
  return (
    <div className='board'>
      {boardCells.map((row, i) => (
        <div className='board-row' key={"row-"+i}>
          {row.map((cell, j) => (<Cell value={cell} key={"r"+i+"c"+j} />))}
        </div>
      ))}
    </div>
  );
}

function Control({ handleMove }) {
  return (
    <div className='control'>
      <button className="btn-up" onClick={() => handleMove("U")}>Up</button>
      <button className="btn-left" onClick={() => handleMove("L")}>Left</button>
      <button className="btn-down" onClick={() => handleMove("D")}>Down</button>
      <button className="btn-right" onClick={() => handleMove("R")}>Right</button>
    </div>
  )
}

function Game() {
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [trapPosition, setTrapPosition] = useState([2, 1]);
  const [dragonPosition, setDragonPosition] = useState([3, 3]);
  const [treasurePosition, setTreasurePosition] = useState([4, 4]);

  let board = createBoardCells(playerPosition, trapPosition, null, treasurePosition);

  function handleMove(move) {
    if (checkValidMove(playerPosition, move)) {
      if (move === "U") {
        setPlayerPosition([playerPosition[0]-1, playerPosition[1]]);
      }
      if (move === "D") {
        setPlayerPosition([playerPosition[0]+1, playerPosition[1]]);
      }
      if (move === "L") {
        setPlayerPosition([playerPosition[0], playerPosition[1]-1]);
      }
      if (move === "R") {
        setPlayerPosition([playerPosition[0], playerPosition[1]+1]);
      }

      if (checkSamePostion(playerPosition, dragonPosition)) {
        // TODO - Lose condition
      }
      if (checkSamePostion(playerPosition, treasurePosition)) {
        // TODO - Win condition
      }
      if (checkSamePostion(playerPosition, trapPosition)) {
        // TODO - Wake up the dragon
      }
    }
  }

  return (
    <div className='main'>
      <h1>Dragons Treasure</h1>
      <p>By moving yourself aroud the grid find the dragons hidden treasure. However, be careful, if you find the dragons trap, they will wake up an start moving towards your position.</p>

      <div className='game'>
        <Board boardCells={board} />
        <Control handleMove={handleMove} />
      </div>
    </div>
  );
}

export default function App() {
  return <Game />;
}

/**
 * Check to see if to objects are in the same position
 * @param {*} positionA
 * @param {*} positionB
 * @returns true if position A and B are the same
 */
function checkSamePostion(positionA, positionB) {
  return JSON.stringify(positionA) === JSON.stringify(positionB);
}

/**
 * Check if the move selected is a valid move for the players current position
 * @param {*} playerPosition
 * @param {*} move
 * @returns True if the move is valid
 */
function checkValidMove(playerPosition, move) {

  // Check if move goes of the left side of the board
  if (move === "L" && playerPosition[1] === 0) {
    return false;
  }
  // Check if move goes of the top of the board
  if (move === "U" && playerPosition[0] === 0) {
    return false;
  }
  // Check if move goes of the right side of the board
  if (move === "R" && playerPosition[1] === 4) {
    return false;
  }
  // Check if move goes of the bottom of the board
  if (move === "D" && playerPosition[0] === 4) {
    return false;
  }

  return true;
}

/**
 * Function to create the board based upon the current postions
 * @param {*} playerPosition
 * @param {*} trapPosition
 * @param {*} dragonPosition
 * @param {*} treasurePosition
 * @returns A array which where each element is array for each row of the board.
 */
function createBoardCells(playerPosition, trapPosition, dragonPosition, treasurePosition) {
  let boardCells = Array.from(Array(5), () => new Array(5).fill(null));

  if (playerPosition) {
    boardCells[playerPosition[0]][playerPosition[1]] = "P";
  }
  if (trapPosition) {
    boardCells[trapPosition[0]][trapPosition[1]] = "T";
  }
  if (dragonPosition) {
    boardCells[dragonPosition[0]][dragonPosition[1]] = "D";
  }
  if (treasurePosition) {
    boardCells[treasurePosition[0]][treasurePosition[1]] = "X";
  }

  return boardCells;
}

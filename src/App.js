import Board from './Board'
import PlayerControls from './PlayerControl';

import './App.css';
import { useState } from 'react';

function Game() {
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [trapPosition, setTrapPosition] = useState([2, 1]);
  const [dragonPosition, setDragonPosition] = useState([3, 3]);
  const [treasurePosition, setTreasurePosition] = useState([4, 4]);

  const [gameInProgress, setGameInProgress] = useState(true);
  const [dragonAwake, setDragonAwake] = useState(false);
  const [gameStatus, setGameStatus] = useState("The dragon is currently asleep, find its trasure without falling into its traps.");

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

    }
  }

  if (gameInProgress) {
    // Check win condition
    if (checkSamePostion(playerPosition, dragonPosition)) {
      setGameInProgress(false);
      setGameStatus("You have been eaten by the dragon. Game Over.");
    }

    // Check lose condition
    if (checkSamePostion(playerPosition, treasurePosition)) {
      setGameInProgress(false);
      setGameStatus("You have found the dragons treasure and won the game.");
    }

    // If the dragon is asleep check if the play has found a trap
    if (!dragonAwake && checkSamePostion(playerPosition, trapPosition)) {
      setDragonAwake(true);
      setGameStatus("You have fallen into the dragons trap and woken him up. Find the treasure before he eats you.");
    }
  }

  let board;
  if (dragonAwake) {
    board = createBoardCells(playerPosition, null, dragonPosition, null);
  } else {
    board = createBoardCells(playerPosition, null, null, null);
  }

  return (
    <div>
      <div className='game'>
        <Board boardCells={board} />
        <PlayerControls handleMove={handleMove} gameInProgress={gameInProgress} />
      </div>
      <p className='game-status'>{gameStatus}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className='main'>
      <h1>Dragons Treasure</h1>
      <p>By moving yourself aroud the grid find the dragons hidden treasure. However, be careful, if you find the dragons trap, they will wake up an start moving towards your position.</p>
      <Game />
    </div>
  );
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

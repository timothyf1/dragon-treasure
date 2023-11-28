import Board from './Board'
import GameControls from './GameControl';
import PlayerControls from './PlayerControl';

import './App.css';
import { useState } from 'react';

function Game() {
  const [playerPosition, setPlayerPosition] = useState(null);
  const [trapPosition, setTrapPosition] = useState(null);
  const [dragonPosition, setDragonPosition] = useState(null);
  const [treasurePosition, setTreasurePosition] = useState(null);
  const [startPositions, setStartPositions] = useState(null);

  const [gameInProgress, setGameInProgress] = useState(false);
  const [dragonAwake, setDragonAwake] = useState(null);
  const [gameStatus, setGameStatus] = useState("Please select an option above to start a game.");

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

  function handleGameOptions(option) {
    let positions = [];
    switch(option) {
      case "new-game": {

        let playerPos = findNewPosition(positions);
        positions.push(playerPos);
        let trapPos = findNewPosition(positions);
        positions.push(trapPos);
        let draPos = findNewPosition(positions);
        positions.push(draPos);
        let treasPos = findNewPosition(positions);
        positions.push(treasPos);
        break;
      }

      case "restart-game": {
        positions = startPositions;
        break;
      }

      case "training-game": {
        positions = [[0, 0], [2, 1], [3, 3], [4, 4]];
        break;
      }
    }

    setGameInProgress(true);
    setDragonAwake(false);
    setGameStatus("The dragon is currently asleep, find its trasure without falling into its traps.");
    setPlayerPosition(positions[0]);
    setTrapPosition(positions[1]);
    setDragonPosition(positions[2]);
    setTreasurePosition(positions[3]);
    setStartPositions(positions);
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
      <GameControls handleGameOptions={handleGameOptions} />
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

/**
 * Find a new postion for an object in the game
 * @param {*} existingPositions An array containg elements which are the current positions of objects
 * @returns An array with 2 elements to describe the new location.
 */
function findNewPosition(existingPositions) {
  let candidatePos;
  do {
    candidatePos = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)];
  } while (positionUsed(existingPositions, candidatePos))
  return candidatePos;
}

/**
 * Find out if an candidate position is already used in a Array of the used positions
 * @param {*} existingPositions An array containing the postions already used
 * @param {*} candidatePos The postion we are checking to see if already been used
 * @returns Boolean ture if the position has already been used
 */
function positionUsed(existingPositions, candidatePos) {
  return existingPositions.reduce((currentStatus, element) => {
    return currentStatus || checkSamePostion(candidatePos, element);
  }, false);
}

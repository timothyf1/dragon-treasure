import Board from './Board';
import GameControls from './GameControl';
import PlayerControls from './PlayerControl';

import './App.css';
import { useState } from 'react';

function Game() {
  const smallBoardSize = [5, 5];
  const mediumBoardSize = [7, 7];
  const largeBoardSize = [9, 9];

  const [playerPosition, setPlayerPosition] = useState(null);
  const [trapPosition, setTrapPosition] = useState(null);
  const [dragonPosition, setDragonPosition] = useState(null);
  const [treasurePosition, setTreasurePosition] = useState(null);
  const [startPositions, setStartPositions] = useState(null);

  const [gameInProgress, setGameInProgress] = useState(false);
  const [dragonAwake, setDragonAwake] = useState(null);
  const [gameStatus, setGameStatus] = useState("Please select an option above to start a game.");
  const [gameMoveStatus, setGameMoveStatus] = useState("");
  const [gameNextBoardSize, setGameNextBoardSize] = useState(smallBoardSize);
  const [gamecurrentBoardSize, setGameCurrentBoardSize] = useState(smallBoardSize);

  /**
   * Check if the player has lost the game if eaten by the dragon.
   * Ends the game and displays lose message.
   * @param {*} playerPosition
   * @param {*} dragonPosition
   * @returns true if the player has lost the game
   */
  function checkLose(playerPosition, dragonPosition) {
    if (checkSamePostion(playerPosition, dragonPosition)) {
      setGameInProgress(false);
      setGameStatus("You have been eaten by the dragon. Game Over.");
      return true;
    }
    return false;
  }

  /**
   * Check if the the player has won the game by finding the treasure.
   * Ends the game and displays win message.
   * @param {*} playerPosition
   * @returns true if the player has won the game
   */
  function checkWin(playerPosition) {
    if (checkSamePostion(playerPosition, treasurePosition)) {
      setGameInProgress(false);
      setGameStatus("You have found the dragons treasure and won the game.");
      return true;
    }
    return false;
  }

  /**
   * Check to see if the player has fallen into the dragons trap.
   * Displays message that the dragon has been woken.
   * @param {*} playerPosition
   * @returns true if the player has fallen into the dragons trap
   */
  function checkTrap(playerPosition) {
    if (!dragonAwake && checkSamePostion(playerPosition, trapPosition)) {
      setDragonAwake(true);
      setGameStatus("You have fallen into the dragons trap and woken him up. Find the treasure before he eats you.");
      return true;
    }
    return false;
  }

  /**
   * Checks to see if the player has selected a valid move,
   * then moves the player if valid
   * checks the win and lose conditions of the game
   * moves the dragon if awake
   * @param {*} move
   */
  function handleMove(move) {
    if (checkValidMove(gamecurrentBoardSize, playerPosition, move)) {
      setGameMoveStatus("");

      // Find the players new location
      let newPlayerPos;
      if (move === "U") {
        newPlayerPos = [playerPosition[0]-1, playerPosition[1]];
      }
      if (move === "D") {
        newPlayerPos = [playerPosition[0]+1, playerPosition[1]];
      }
      if (move === "L") {
        newPlayerPos = [playerPosition[0], playerPosition[1]-1];
      }
      if (move === "R") {
        newPlayerPos = [playerPosition[0], playerPosition[1]+1];
      }
      setPlayerPosition(newPlayerPos);

      // Check Win and lose conditions for the game
      if (checkWin(newPlayerPos)) {
        return;
      }
      if (checkLose(newPlayerPos, dragonPosition)) {
        return;
      }

      if (dragonAwake) {
        // As the dragon is awake the dragon moves towards the player
        let newDragonPos = newDragonPosition(dragonPosition, playerPosition);
        setDragonPosition(newDragonPos);

        // Once the dragon has moved check again to see if the dragon has eaten the player
        if (checkLose(newPlayerPos, newDragonPos)) {
          return;
        }
      } else {
        // Check if the player has fallen into a trap
        checkTrap(newPlayerPos);
      }

    } else {
      setGameMoveStatus("The seleted move is invalid. Please select a move which stays within the grid.");
    }
  }

  /**
   * Handles the game options buttons
   * @param {*} option
   */
  function handleGameOptions(option) {
    let positions = [];
    switch(option) {
      case "new-game": {
        positions = newGameFindPositions(gameNextBoardSize);
        setGameCurrentBoardSize(gameNextBoardSize);
        break;
      }
      case "restart-game": {
        positions = startPositions;
        break;
      }
      case "training-game": {
        positions = [[0, 0], [2, 1], [3, 3], [4, 4]];
        setGameCurrentBoardSize(smallBoardSize);
        break;
      }
    }

    setGameInProgress(true);
    setDragonAwake(false);
    setGameStatus("The dragon is currently asleep, find its trasure without falling into its traps.");
    setGameMoveStatus("");
    setPlayerPosition(positions[0]);
    setTrapPosition(positions[1]);
    setDragonPosition(positions[2]);
    setTreasurePosition(positions[3]);
    setStartPositions(positions);
  }

  /**
   * Handle the change in board size for the next game
   * @param {*} option
   */
  function handleBoardSize(option) {
    switch(option) {
      case "small": {
        setGameNextBoardSize(smallBoardSize);
        break;
      }
      case "medium": {
        setGameNextBoardSize(mediumBoardSize);
        break;
      }
      case "large": {
        setGameNextBoardSize(largeBoardSize);
        break;
      }
    }
  }

  let board;
  // If the dragon is awake then he is shown on the board
  if (dragonAwake) {
    board = createBoardCells(gamecurrentBoardSize, playerPosition, null, dragonPosition, null);
  } else {
    board = createBoardCells(gamecurrentBoardSize, playerPosition, null, null, null);
  }

  return (
    <div>
      <GameControls handleGameOptions={handleGameOptions} handleBoardSize={handleBoardSize} />
      <p className='game-status'>{gameStatus}</p>
      <p className='game-move-status'>{gameMoveStatus}</p>
      <div className='game'>
        <Board boardCells={board} />
        <PlayerControls handleMove={handleMove} gameInProgress={gameInProgress} />
      </div>
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
function checkValidMove(boradSize, playerPosition, move) {

  // Check if move goes of the left side of the board
  if (move === "L" && playerPosition[1] === 0) {
    return false;
  }
  // Check if move goes of the top of the board
  if (move === "U" && playerPosition[0] === 0) {
    return false;
  }
  // Check if move goes of the right side of the board
  if (move === "R" && playerPosition[1] === boradSize[1]-1) {
    return false;
  }
  // Check if move goes of the bottom of the board
  if (move === "D" && playerPosition[0] === boradSize[0]-1) {
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
function createBoardCells(boradSize, playerPosition, trapPosition, dragonPosition, treasurePosition) {
  let boardCells = Array.from(Array(boradSize[0]), () => new Array(boradSize[1]).fill(null));

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
 * Function to generate 4 positions which will be used in a new game
 * @returns An array where each element is different postion
 */
function newGameFindPositions(boradSize) {
  let positions = [];
  for (let i = 0; i < 4; i++) {
    positions.push(findNewPosition(boradSize, positions));
  }
  return positions;
}

/**
 * Find a new postion for an object in the game
 * @param {*} existingPositions An array containg elements which are the current positions of objects
 * @returns An array with 2 elements to describe the new location.
 */
function findNewPosition(boradSize, existingPositions) {
  let candidatePos;
  do {
    candidatePos = [Math.floor(Math.random() * boradSize[0]), Math.floor(Math.random() * boradSize[1])];
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

/**
 * Calculates the new location for the dragon to move when awake
 * @param {*} dragonPosition The current position of the dragon
 * @param {*} playerPosition The current position of the player
 * @returns The new position of the dragon
 */
function newDragonPosition(dragonPosition, playerPosition) {
  let dirHor = Math.abs(playerPosition[0] - dragonPosition[0]) < Math.abs(playerPosition[1] - dragonPosition[1]) ? true : false;

  if (dirHor) {
    if (playerPosition[1] < dragonPosition[1]) {
      return [dragonPosition[0], dragonPosition[1] - 1];
    } else {
      return [dragonPosition[0], dragonPosition[1] + 1];
    }
  } else {
    if (playerPosition[0] < dragonPosition[0]) {
      return [dragonPosition[0] - 1, dragonPosition[1]];
    } else {
      return [dragonPosition[0] + 1, dragonPosition[1]];
    }
  }
}

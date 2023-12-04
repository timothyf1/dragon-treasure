import './GameControl.css'

/**
 * The user game control buttons to start a new game
 * @param handleGameOptions function to handle changes in game options
 * @param handleBoardSize function to handle changes in board size
 * @returns JSX element for the game controls.
 */
export default function GameControls({ handleGameOptions, handleBoardSize }) {
  return (
    <div className="game-control">
      <p>Select the board size for next game:</p>
      <div className="game-options">
        <input type="radio" value="Small" name="size" onChange={() => handleBoardSize("small")} />Small
        <input type="radio" value="Medium" name="size" onChange={() => handleBoardSize("medium")} />Medium
        <input type="radio" value="Large" name="size" onChange={() => handleBoardSize("large")} />Large
      </div>
      <div className="game-options">
        <button className="game-new-game" onClick={() => handleGameOptions("new-game")}>New Game</button>
        <button className="game-restart-game" onClick={() => handleGameOptions("restart-game")}>Restart Game</button>
        <button className="game-training-game" onClick={() => handleGameOptions("training-game")}>Training Game</button>
      </div>
    </div>
  );
}

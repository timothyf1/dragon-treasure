import './GameControl.css'

/**
 * The user game control buttons to start a new game
 * @param handleGameOptions
 * @param gameInProgress
 * @returns JSX element for the game controls.
 */
export default function GameControls({ handleGameOptions }) {
  return (
    <div className="game-control">
      <button className="game-new-game" onClick={() => handleGameOptions("new-game")}>New Game</button>
      <button className="game-restart-game" onClick={() => handleGameOptions("restart-game")}>Restart Game</button>
      <button className="game-training-game" onClick={() => handleGameOptions("training-game")}>Training Game</button>
    </div>
  );
}

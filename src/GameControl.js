import './GameControl.css'

export default function GameControls({ handleGameOptions, gameInProgress }) {
  return (
    <div className="game-control">
      <button className="game-new-game" onClick={() => handleGameOptions("new-game")}>New Game</button>
      <button className="game-restart-game" onClick={() => handleGameOptions("restart-game")}>Restart Game</button>
      <button className="game-training-game" onClick={() => handleGameOptions("training-game")}>Training Game</button>
    </div>
  );
}

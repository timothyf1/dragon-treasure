import './PlayerControl.css'

/**
 * The controls for the player
 * @param handleMove Function which is called when a move button is clicked
 * @param gameInProgress Boolean which is true if there is a game in progress for the controls to be active
 * @returns JSX element for the player controls.
 */
export default function PlayerControls({ handleMove, gameInProgress }) {
  return (
    <div className='control'>
      <button className="btn-up" onClick={() => handleMove("U")} disabled={!gameInProgress}>Up</button>
      <button className="btn-left" onClick={() => handleMove("L")} disabled={!gameInProgress}>Left</button>
      <button className="btn-down" onClick={() => handleMove("D")} disabled={!gameInProgress}>Down</button>
      <button className="btn-right" onClick={() => handleMove("R")} disabled={!gameInProgress}>Right</button>
    </div>
  )
}

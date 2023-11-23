import './Board.css'

/**
 * An individual cell of the board.
 * @param value The contents of a particalar cell in the board.
 * @returns JSX element for the cell
 */
function Cell({ value }) {
  return <div className='board-cell'>{ value }</div>;
}

/**
 * The gird for the game
 * @param boardCells A 2D array with the contents of the board to be displayed
 * @returns JSX element for the board.
 */
export default function Board({ boardCells }) {
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

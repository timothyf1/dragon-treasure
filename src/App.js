import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Cell({ value }) {
  return <div className='board-cell'>{ value }</div>;
}

function Board() {
  const [boardCells, setBoardCells] = useState(Array(5).fill(Array(5).fill(1)));

  return (
    <div className='board'>
      {boardCells.map((row, i) => (
        <div className='board-row' key={"row-"+i}>
          {row.map((cell, j) => (<Cell value={cell} key={"row-"+i+"col"+j} />))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return <Board />;
}

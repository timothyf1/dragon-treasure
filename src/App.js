import logo from './logo.svg';
import './App.css';

function Cell({ value }) {
  return <div className='board-cell'>{ value }</div>;
}

function Board() {
  return (
    <div className='board'>
      <div className='board-row'>
        <Cell value={"P"} />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className='board-row'>
        <Cell value={2} />
        <Cell />
        <Cell value={"T"} />
        <Cell />
        <Cell />
      </div>
      <div className='board-row'>
        <Cell />
        <Cell value={4} />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className='board-row'>
        <Cell />
        <Cell />
        <Cell />
        <Cell value={"L"} />
        <Cell />
      </div>
      <div className='board-row'>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell value={4} />
      </div>
    </div>
  );
}

export default function App() {
  return <Board />;
}

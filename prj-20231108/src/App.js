import './App.css';
import CountFunction from './Counter';
import TodoList from './TodoList';

function App() {
  return (
    <div className="container">
      <div className='row'>
        <div className='col-4'><CountFunction/></div>
        <div className='col-4'><TodoList/></div>
        <div className='col-4'></div>
      </div>
    </div>
  );
}

export default App;

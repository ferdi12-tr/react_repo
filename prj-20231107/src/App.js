import logo from './logo.svg';
import './App.css';

function App() {
  function ClickButton() {
    console.log(document.getElementById("inp").value) 
  }
  return (
    <div className="App">
      <button onClick={() => ClickButton()}>
        Click me
      </button>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import GameComponent from './GameComponent';

function App() {
  const data = {
    "India": "Delhi",
    "Pakistan": "Islamabad",
    "USA": "Washington DC",
    "Srilanka": "Colombo"
  }
  return (
    <div className="App">
        <GameComponent data = {data} />
    </div>
  );
}

export default App;

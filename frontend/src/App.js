import logo from './logo.svg';
import './App.css';
import MusicMoodSorter from './MusicMoodSorter';


// To test code run this on the frontend terminal to get a localtunnel for spotify redirect URI
// npm start
// npx localtunnel --port 3000 --subdomain musicmoodsorter

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <MusicMoodSorter />
      </header>
    </div>
  );
}

export default App;

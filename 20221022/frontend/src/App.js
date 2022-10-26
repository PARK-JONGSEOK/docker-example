import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

async function fetchAPI() {
  const response = await axios.get("http://localhost:3001");
  return response.data;
}

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchAPI().then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

let socket;

function App() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState("");

  const handleClick = () => {
    if (connected === false) {
      setConnected(true);
    } else {
      setConnected(false);
    }
    const aliasData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: '0x003464', wip: 'test' })
  };
    fetch('/link-wip', aliasData).then(res => res.json()).then(data => {
      setData(data.data);
    });
  };

  useEffect(() => {
      // create websocket/connect
      socket = io();

      socket.on("data", (data) => {
        // when we recieve a chat, add it into our messages array in state
        console.log(data);
      })

      // when component unmounts, disconnect
      return (() => {
          socket.disconnect()
      })
  }, []);

  return (
    <div className="App">
      <h1>Digital Twin Tag</h1>
      <button onClick={handleClick}>Click To Call API</button>
      <p>{data}</p>
    </div>
  );
}

export default App;

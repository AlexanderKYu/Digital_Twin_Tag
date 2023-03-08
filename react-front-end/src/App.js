import "./App.css";
import WIP from "./components/WIP";
import Nav from "./components/Nav";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";

import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

let socket;

function App() {

  const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated} = useAuth0()

  const [connected, setConnected] = useState(false);
  const [data, setData] = useState("");

  const testString = "WIP TEST";

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
    <ChakraProvider>
      <div className="App">
        <Nav />
        <h1>Welcome to this React Application</h1>
        {/* <h1>Digital Twin Tag</h1>
        <button onClick={handleClick}>Click To Call API</button>
        <p>{data}</p> */}
        {/* <Nav></Nav>
        <WIP></WIP> */}
    </div>
    </ChakraProvider>
  );
}

export default App;

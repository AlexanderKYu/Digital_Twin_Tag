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
        {/* <h1>Digital Twin Tag</h1>
        <button onClick={handleClick}>Click To Call API</button>
        <p>{data}</p> */}
        <Nav></Nav>
        <WIP></WIP>
        <ul>
          <li>
            <button onClick={loginWithPopup}>Login with Popup</button>
          </li>
          <li>
            <button onClick={loginWithRedirect}>Login with Redirect</button>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
        <h3>User is { isAuthenticated ? "Logged In" : "Not logged in"}</h3>
        { isAuthenticated && (
        <pre style={{textAlign: 'start'}}>{JSON.stringify(user, null, 2)}</pre>
        )}
    </div>
    </ChakraProvider>
  );
}

export default App;

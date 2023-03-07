import "./App.css";
import WIP from "./components/WIP";
import Nav from "./components/Nav";
import Sample  from "./components/Sample";
import { io } from "socket.io-client";

import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import '@fontsource/antonio/500.css'
import theme from "./components/Theme"

let socket;

function App() {
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
    <ChakraProvider theme={theme}>
      <div className="App">
        {/* <h1>Digital Twin Tag</h1>
        <button onClick={handleClick}>Click To Call API</button>
        <p>{data}</p> */}
        <Nav_Sample></Nav_Sample>
        <WIP></WIP>
    </div>
    </ChakraProvider>
  );
}

export default App;

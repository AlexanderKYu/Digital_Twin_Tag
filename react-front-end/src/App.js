import "./App.css";
import WIP from "./components/WIP";
import Nav from "./components/Nav";
import { io } from "socket.io-client";

import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

let socket;

function App() {

  const testString = "WIP TEST";

  const [data, setData] = useState("");

  const handleClick = () => {
    var jsonData = { 
      "tagNumber": "0x001038",
      "wipNumber": "111111",
  }

  const aliasData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
  };

  fetch('/link-wip', aliasData).then(res => res.json()).then(data => {
      setData(data.data);
    });
  }

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
        <button onClick={handleClick}> Send Tag</button>
        {data}
        <WIP></WIP>
    </div>
    </ChakraProvider>
  );
}

export default App;

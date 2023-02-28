import "./App.css";
import WIP from "./components/WIP";
import Nav from "./components/Nav";
import { io } from "socket.io-client";

import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

function App() {
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState("");

  const testString = "WIP TEST";

  const handleClick = () => {
    if (connected === false) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  };

  useEffect(() => {
    if (connected === true) {
      fetch('/http-call').then(res => res.json()).then(data => {
        setData(data.data);
      });
      const socket = io("localhost:5000/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });

      setSocketInstance(socket);

      socket.on("connect", (data) => {
        console.log(data);
      });

      setLoading(false);

      socket.on("disconnect", (data) => {
        console.log(data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [connected]);

  return (
    <ChakraProvider>
      <div className="App">
        {/* <h1>Digital Twin Tag</h1>
        <button onClick={handleClick}>Click To Call API</button>
        <p>{data}</p> */}
        <Nav></Nav>
        <WIP></WIP>
    </div>
    </ChakraProvider>
  );
}

export default App;

import "./App.css";
import WIP from "./components/WIP";
import Nav from "./components/Nav";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";

import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import '@fontsource/antonio/500.css'
import theme from "./components/Theme"

let socket;

function App() {

  const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated} = useAuth0()

  const [connected, setConnected] = useState(false);
  const [data, setData] = useState("");


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
        <Nav></Nav>
        <WIP></WIP>
    </div>
    </ChakraProvider>
  );
}

export default App;

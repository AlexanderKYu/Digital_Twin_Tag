import "./App.css";
import WIP from "./components/WIP";
import Nav from "./components/Nav";
import Welcome  from "./components/Welcome";
import { io } from "socket.io-client";

import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import '@fontsource/antonio/500.css'
import theme from "./components/Theme"
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import { AuthenticationGuard } from "./components/authentication-guard";

let socket;

function App() {

  const { isAuthenticated, user } = useAuth0();
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

  // const { isLoading } = useAuth0();

  // if (isLoading) {
  //   return (
  //     <div className="page-layout">
  //       <PageLoader />
  //     </div>
  //   );
  // }

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard} />} />
          <Route path="/wip" element={<AuthenticationGuard component={WIP} />} />
        </Routes>
        {/* <h1>Digital Twin Tag</h1>
        <button onClick={handleClick}>Click To Call API</button>
        <p>{data}</p> */}
        {/* <Nav></Nav>
        <WIP></WIP> */}
        {/* { !isAuthenticated && (
          <Welcome />
        )}
        { isAuthenticated && (
          <Dashboard />
        )} */}
    </div>
    </ChakraProvider>
  );
}

export default App;

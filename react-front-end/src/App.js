import "./App.css";
import React from 'react';
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import '@fontsource/antonio/500.css'
import theme from "./components/theme/Theme"
import Nav from "./components/Nav";
import WIP from "./components/production/WIP";
import Dashboard from "./components/dashboard/Dashboard.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react'

let socket;

function App() {

  const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated} = useAuth0()

  const [errorMessage, setErrorMessage] = useState("");
  const [tagData, setTagData] = useState({});
  const [serverDown, setServerDown] = useState(false);


  useEffect(() => {
      // create websocket/connect
      socket = io();
      setTagData(sampleData);

      socket.on("getTags", (data) => {
        //set newly recieved tag data to tagData state variable
        setTagData(data);
      })

      socket.on("serverDown", (data) => {
        // set banner up or down depending on whether db pull worked or not
        setServerDown(data.status);
        setErrorMessage(data.message);
      })

      //Implementing the setInterval method
      const interval = setInterval(() => {
        if(!socket.connected){
          //setServerDown(true);
          setServerDown(true);
          setErrorMessage("Flask Server Not Connected");
        }
      }, 15000);

      // when component unmounts, disconnect
      return (() => {
          socket.disconnect();
          clearInterval(interval);
      })
  }, []);

  return (
    <ChakraProvider theme={theme}>

    <BrowserRouter>
      <div className="App"> 
      
      <Nav></Nav>
      {serverDown && (
        <Alert status="error" variant="solid" fontFamily="Arial" bg="#a3142e">
          <AlertIcon />
          <Box>
            <AlertDescription>
              {errorMessage}
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf='end'
            position='absolute'
            right={1}
            top={2}
            onClick={()=>{
              setServerDown(false);
            }}
          />
          
        </Alert>
      )}

          <Routes>
            <Route path="/" element={<WIP></WIP>} />
            <Route path="dashboard" element={<Dashboard tagData={tagData}></Dashboard> } />
          </Routes>
          </div>
        </BrowserRouter>
    
  </ChakraProvider>
  );
}

export default App;

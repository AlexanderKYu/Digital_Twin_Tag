import "./App.css";
import React from 'react';
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
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
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react'

let socket;

function App() {

  const [errorMessages, setErrorMessages] = useState([]);
  const [tagData, setTagData] = useState({});
  const [overwrittenWips, setOverwrittenWips] = useState([])

  
  useEffect(() => {

      // create websocket/connect
      socket = io("http://127.0.0.1:5000");

      socket.on("getTags", (data) => {
        //set newly recieved tag data to tagData state variable
        setTagData(data);
      })

      socket.on("serverDown", (data) => {
        // set banner up or down depending on whether db pull worked or not
        if(data.down){
          setErrorMessages(oldMessages => { 
            if(!oldMessages.some(({id}) => id === data.id)){
              return [
                ...oldMessages,
                {id: data.id, msg: data.message}
              ]
            } else {
              return [
                ...oldMessages
              ]
            }
            });
        } else {
          setErrorMessages(oldMessages => oldMessages.filter(e => 
            e.id !== data.id
            ));
        }
      })

      //Implementing the setInterval method
      const interval = setInterval(() => {
        if(!socket.connected){
          setErrorMessages(oldMessages => {
            if(!oldMessages.some(({id}) => id === 0)){
            return [
            ...oldMessages,
            {id: 0, msg: "Le serveur Flask n'est pas connecté / Flask Server Not Connected"}
            ]
          }
          else {
            return [
              ...oldMessages
              ]
          }
        });
        } else {
          setErrorMessages(oldMessages => oldMessages.filter(e => 
            e.id !== 0
            ));
        }
      }, 15000);

      socket.on("tagOverwritten", (data) => {
        //adds another tag to overwrittenWips when a new wip overwrite is detected
        setOverwrittenWips(oldWips => [...oldWips, data]);
      })

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
      {(errorMessages) && (
        errorMessages.map((error, i) => (
        <Alert status="error" variant="solid" fontFamily="Arial" bg="#a3142e" key={error.id + "." + i}>
          <AlertIcon />
          <Box>
            <AlertDescription>
              {error.msg}
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf='end'
            position='absolute'
            right={1}
            top={2}
            onClick={()=>{
              const uniqueErrors = [...new Set(errorMessages.filter(e => 
                e.id !== error.id
                ))];
              setErrorMessages(uniqueErrors);
            }}
          />
          
        </Alert>
        )
      ))}

          <Routes>
            <Route path="/" element={<WIP></WIP>} />
            <Route path="dashboard" element={<Dashboard tagData={tagData} overwrittenWips={overwrittenWips} setOverwrittenWips={setOverwrittenWips} ></Dashboard> } />
          </Routes>
          </div>
        </BrowserRouter>
    
  </ChakraProvider>
  );
}

export default App;

import "../App.css";
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import '@fontsource/antonio/500.css'
import theme from "./theme/Theme"
import Nav from "./Nav";
import WIP from "./WIP";
import Dashboard from "./Dashboard.js";

let socket;

function App() {

  const {loginWithPopup, loginWithRedirect, logout, user, isAuthenticated} = useAuth0()

  const [connected, setConnected] = useState(false);
  const [data, setData] = useState("");
  const [tagData, setTagData] = useState({});


  return (
    <ChakraProvider theme={theme}>
      <div className="DashApp">
        <Dashboard tagData={tagData}></Dashboard>  
    </div>
    
    </ChakraProvider>
  );
}

export default App;

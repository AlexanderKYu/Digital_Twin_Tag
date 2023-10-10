import { ReactNode } from "react";
import { Box, Flex, Text, Input, Button, ChakraProvider } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from 'react';
import AllTag from "./TagAll.js";
import ZoneRow from "./ZoneRow.js";
import ZoneRowB from "./ZoneRowB.js";
import FloorMap from "./FloorMap.js";
import theme from "./theme/Theme"

export default function Dashboard({tagData}) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'ilovebauer') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password');
    }
 };

 return (
  <>
    {!isAuthenticated ? (
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="pink">
          <Flex mt={0} bg="black" color="white">
            <Box flex="1" flexGrow="0.5" minH="100vh" pr={10} pl={10}></Box>
      <form onSubmit={handleSubmit}>
        <Text fontSize="5xl" textAlign="center">Enter Password for Supervisor Dashboard</Text>
        <br></br>
        <Input
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        bg="white"
        color="black"
        mt={3}
        mr={2}
        borderRadius="150"
        />
        <Button
        type="submit" 
        value="Submit"
        bg="black"
        color="white"
        borderColor="white"
        colorScheme="linkedin"
        height={14}
        width={20}
        borderWidth={3}
        borderRadius="150"
        mt={6}
        pl={20}
        pr={20}
        >
          <ArrowForwardIcon></ArrowForwardIcon>
        </Button>
      </form>
      </Flex>
        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    ) : (
      <>
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="pink">
          <Flex mt={0} bg="black" color="white">
            <Box flex="1" flexGrow="0.5" minH="100vh" pr={10} pl={10}>
              {/* MAP */}
              <Box p={10} height="auto" borderColor="white" borderWidth={2} borderRadius={20} color="white" mb={10}>
                <Text color="white" fontSize="5xl" mb={2}>
                  FLOOR MAP
                </Text>
                <Box bg="white" borderRadius={20} pr={8} pb={8} pl={2} pt={2}>
                <FloorMap tagData={tagData}></FloorMap>
                </Box>
              </Box>
              {/* ZONES */}
            </Box>
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              bg="black"
              pr={10}
              pl={10}
            >
              {/* TAGS */}
              <Box
                p={10}
                borderColor="white"
                borderWidth={2}
                borderRadius={20}
                height="auto"
                mb={10}
              >
                <Text color="white" fontSize="5xl" mb={2}>
                  TAGS
                </Text>
                <AllTag tagData={tagData}></AllTag>
              </Box>

              {/* ZONES */}
            </Box>
          </Flex>
        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    </>
    )}
  </>
);
}

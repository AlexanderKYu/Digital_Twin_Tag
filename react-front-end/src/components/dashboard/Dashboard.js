import {ReactNode} from "react";
import {
    Box,
    Flex,
    Text,
    Input,
    Button,
    ChakraProvider
} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";
import {useState} from 'react';
import FloorMap from "./FloorMap.js";
import TagAll from "./TagAll.js";
import WipTimeAll from "./WipTimeAll.js";
import WipTimeRow from "./WipTimeRow.js";

export default function Dashboard({tagData}) {
    const [password,
        setPassword] = useState('');
    const [isAuthenticated,
        setIsAuthenticated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'ilovebauer') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect Password');
        }
    };

    return ( <> {
        !isAuthenticated
            ? (
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
                                    borderRadius="150"/>
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
                                    pr={20}>
                                    <ArrowForwardIcon></ArrowForwardIcon>
                                </Button>
                            </form>
                        </Flex>
                    </Box>
                    <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
                </Flex>
            )
            : (
          <>

          {/* middle flex */}
          <Flex mt={0} bg="#0d1117" color="white">
          {/* left panel box of middle */}
          <Box flex="1" flexGrow="0.5" bg="#0d1117" mt={5} ml={10} mr={2}>
            {/* MAP */}
            <Box
              p={5}
              pb={10}
              height="auto"
              borderColor="grey.200"
              borderWidth={0.2}
              borderRadius={10}
              color="white"
              mb={5}
              bg="#0d1117"
            >
              <Text color="white" fontSize="5xl" mb={2}>
                FLOOR MAP
              </Text>
              <Box bg="#21262d" borderRadius={10} p={2}>
                <FloorMap tagData={tagData}></FloorMap>
              </Box>
            </Box>
          </Box>
          {/* right panel box of middle */}
          <Box flex="1" flexGrow="0.5" bg="#0d1117" mt={5} mr={10} ml={2}>
            {/* TAGS */}
            <Box
              p={5}
              pb={10}
              height="auto"
              borderColor="grey.200"
              borderWidth={0.2}
              borderRadius={10}
              color="white"
              mb={5}
              bg="#0d1117"
            >
              <Text color="white" fontSize="5xl" mb={2}>
                TAGS
              </Text>
              <TagAll tagData={tagData}></TagAll>
            </Box>
            {/* WIP TIME */}
            <Box
              p={5}
              pb={10}
              height="auto"
              borderColor="grey.200"
              borderWidth={0.2}
              borderRadius={10}
              color="white"
              mb={5}
              bg="#0d1117"
            >
              <Text color="white" fontSize="5xl" mb={2}>
                WIP TIME EDIT
              </Text>
              <WipTimeRow>

              </WipTimeRow>
              {/* <WipTimeAll tagData={tagData}></WipTimeAll> */}
            </Box>
          </Box>
          </Flex>
          </>
            )
    } </>);
    }
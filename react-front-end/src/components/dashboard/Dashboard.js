import {ReactNode, useEffect} from "react";
import {
    Box,
    Flex,
    Text,
    Input,
    Button,
} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {useState} from 'react';
import FloorMap from "./FloorMap.js";
import TagAll from "./TagAll.js";
import WipTimeRow from "./WipTimeRow.js";
import Filter from "./Filter.js";

export default function Dashboard({tagData, overwrittenWips, setOverwrittenWips}) {
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
    
    const [filterTagData, setFilterTagData] = useState(tagData);
    const [filters, setFilters] = useState({
      "inactive": false,
      "rush": false,
    });

    //filter and sort tags
    const filterTags = (tags) => {
      if(filters["inactive"]){
        tags = Object.keys(tags).reduce(function(acc, val) {
          if(tags[val]["inactive"] === true)  acc[val] = tags[val];
        return acc;
        }, {});
      } else if(filters["rush"]){
        tags = Object.keys(tags).reduce(function(acc, val) {
          if(tags[val]["rush"] === true)  acc[val] = tags[val];
        return acc;
        }, {});
      }
      return tags
    }

    useEffect(()=> {
      setFilterTagData(filterTags(tagData))
    }, [tagData, filters]);

    

    return ( <> {
        !isAuthenticated
            ? (
                <Flex align="center" mt={0} bg="#0d1117" color="white">
                    <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="#0d1117"></Box>
                    <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="pink">
                        <Flex mt={0} bg="#0d1117" color="white">
                            <Box flex="1" flexGrow="0.5" minH="100vh" pr={10} pl={10} textAlign="center"></Box>
                            <form onSubmit={handleSubmit}>
                                <Text fontSize="5xl" textAlign="center">Enter password for supervisor dashboard</Text>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    bg="white"
                                    color="black"
                                    m={7}
                                    textAlign="center"
                                    borderRadius="150"
                                    width="500px"/>
                                <br></br>
                                <Button
                                    variant="wipBtn"
                                    type="submit"
                                    >
                                    <ArrowForwardIcon></ArrowForwardIcon>
                                </Button>
                            </form>
                        </Flex>
                    </Box>
                    <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="#0d1117"></Box>
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
                <FloorMap tagData={filterTagData}></FloorMap>
              </Box>
            </Box>

            {/* FILTER TEST */}
            <Box> 

            </Box>
          </Box>
          {/* right panel box of middle */}
          <Box flex="1" flexGrow="0.5" bg="#0d1117" mt={5} mr={10} ml={2}>
            {/* TAGS */}
            <Box
              p={5}
              pb={10}
              height="600px"
              overflowY="scroll"
              width="auto"
              borderColor="grey.200"
              borderWidth={0.2}
              borderRadius={10}
              color="white"
              mb={5}
              bg="#0d1117"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                  height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  marginTop: "10px",
                  marginBottom: "10px",
                },
                '&::-webkit-scrollbar-thumb': {
                  background: "white ",
                  borderRadius: '10px',
                },
              }}
            >
              <Filter setFilters={setFilters}></Filter>
              <TagAll tagData={filterTagData}></TagAll>
            </Box>
            {/* WIP TIME */}
            <Box
              p={5}
              pb={10}
              height="600px"
              overflowY="scroll"
              width="auto"
              borderColor="grey.200"
              borderWidth={0.2}
              borderRadius={10}
              color="white"
              mb={5}
              bg="#0d1117"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                  height: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  marginTop: "10px",
                  marginBottom: "10px",
                },
                '&::-webkit-scrollbar-thumb': {
                  background: "white ",
                  borderRadius: '10px',
                },
              }}
            >
              <Text color="white" fontSize="5xl" mb={2}>
                WIP TIME EDIT
              </Text>
              <WipTimeRow overwrittenWips={overwrittenWips} setOverwrittenWips={setOverwrittenWips}>

              </WipTimeRow>
              {/* <WipTimeAll tagData={tagData}></WipTimeAll> */}
            </Box>
          </Box>
          </Flex>
          </>
            )
    } </>);
    }

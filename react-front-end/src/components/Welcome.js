import React from "react";
import { 
  Text,
  Flex,
  Box
} from '@chakra-ui/react'

export default function Welcome() {
  return (
    <>
      <Flex 
      align="center"
      mt={0}
      bg="black"
      color="white">
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="black" >
        </Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
          <Text fontSize="6xl">WELCOME</Text>
          <Text fontSize="4xl">Please log-in to access all features.</Text>
        </Box>
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="black">
        </Box>
      </Flex>
    </>
  );
}


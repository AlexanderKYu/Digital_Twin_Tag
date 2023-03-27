import { ReactNode } from "react";
import {
  Box,
  Container,
  useDisclosure,
  useColorModeValue,
  Image,
  AspectRatio,
  Input,
  VStack,
  HStack,
  Flex,
  Spacer,
  Center,
  Text,
  Square,
  InputGroup,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Sample() {
  return (
    <>
      {/* <Flex 
      align="center"
      mt={0}
      bg="black"
      color="white">
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="white" >
          <Text>Border Left</Text>
        </Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
          <Text>Body</Text>
        </Box>
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="white">
          <Text>Border Right</Text>
        </Box>
      </Flex> */}

      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
          <Flex align="center" mt={0} bg="black" color="white">
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              pt={10}
              pb={10}
              pl={20}
              pr={20}
              bg="black"
              borderRight="solid"
              border-color="white"
              border-width="4px"
            >
            </Box>
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              pt={10}
              pb={10}
              pl={20}
              pr={20}
              bg="black"
            >
              <Text fontSize="5xl">SEARCH / RECHERCHE</Text>
              <InputGroup>
                <Input
                  type=""
                  placeholder=""
                  bg="white"
                  borderRadius={150}
                  size="lg"
                  color="black"
                  mt={2}
                  mb={4}
                  focusBorderColor="teal.600"
                  borderColor="white"
                  borderWidth={3}
                  fontFamily="arial"
                  textAlign="center"
                  fontSize="2xl"
                />
              </InputGroup>
              <Flex
                align="center"
                bg="pink"
                borderRadius={30}
                height={14}
                color="black"
                focusBorderColor="#00FFFF"
                borderColor="white"
                borderWidth={3}
                fontFamily="arial"
                textAlign="center"
                fontSize="md"
                pl={2}
                pr={2}
                mb={4}
              >
                <Box
                  flex="0.6"
                  bg="gray.900"
                  color="white"
                  borderRadius={15}
                  pt={1}
                  pb={1}
                  pl={4}
                  pr={4}
                >
                  <Text>Number</Text>
                </Box>
                <Spacer />
                <Box
                  flex="2.2"
                  bg="white"
                  borderRadius={10}
                  pt={1}
                  pb={1}
                  pl={4}
                  pr={4}
                >
                  <Text>WIP:</Text>
                </Box>
                <Box
                  flex="0.5"
                  bg="white"
                  borderRadius={10}
                  pt={1}
                  pb={1}
                  pl={4}
                  pr={4}
                >
                  <Text>Battery%</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    </>
  );
}

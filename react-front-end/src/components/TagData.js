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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function TagData() {
  return (
    <>
      <Flex 
      align="center"
      mt={0}
      bg="black"
      color="white">
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="black" >
          <Text>Border Left</Text>
        </Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
          <Text>Body</Text>

          <Input
                bg="white"
                borderRadius={150}
                size="lg"
                color="black"
                mt={2}
                focusBorderColor="#0FFFF"
                borderColor="white"
                borderWidth={3}
                fontFamily="arial"
                textAlign="center"
                fontSize="2xl"
                name=""
                mb={5}
              />

<Box
                bg="pink"
                borderRadius={20}
                height={14}
                color="black"
                mt={2}
                mb={5}
                focusBorderColor="#00FFFF"
                borderColor="white"
                borderWidth={3}
                fontFamily="arial"
                textAlign="center"
                fontSize="2xl"
              />

<Flex align="center"

bg="white"
                borderRadius={20}
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
>

<Box flex='0.6' bg='gray.900' color='white' borderRadius={10} pt={1} pb={1} pl={4} pr={4}>
    <Text>12345678</Text>
  </Box>
  <Spacer/>
  <Box flex='2.2' bg='white' borderRadius={10} pt={1} pb={1} pl={4} pr={4}>
    <Text>WIP: 123456</Text>
  </Box>
  <Box flex='0.5' bg='white' borderRadius={10} pt={1} pb={1} pl={4} pr={4}>
    <Text>99%</Text>
  </Box>
</Flex>


              

          
        </Box>
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="black">
          <Text>Border Right</Text>
        </Box>
      </Flex>
    </>
  );
}

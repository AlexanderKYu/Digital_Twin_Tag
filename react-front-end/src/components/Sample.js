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

export default function Sample() {
  return (
    <>
      <Flex 
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
      </Flex>
    </>
  );
}

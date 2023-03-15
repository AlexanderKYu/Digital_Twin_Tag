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

export default function TagData(props) {
  return (
    <>
          <Flex
            align="center"
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
            mb = {4}
          >
            <Box
              flex="0.6"
              bg="gray.900"
              color="white"
              borderRadius={10}
              pt={1}
              pb={1}
              pl={4}
              pr={4}
            >
              <Text>{props.data.alias}</Text>
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
              <Text>WIP: {props.data.number}</Text>
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
              <Text>{props.data.status}%</Text>
            </Box>
          </Flex>
    </>
  );
}

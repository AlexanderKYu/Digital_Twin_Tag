import { ReactNode, useState } from "react";
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
  Button,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function TagRow(props) {

   const lastSeen = new Date(props.tag.timestamp*1000);
   const lastSeenAll = parseInt(lastSeen.getDate()) + " . " +  parseInt(lastSeen.getMonth()) + " . " +  parseInt(lastSeen.getFullYear()) + " / " +  parseInt(lastSeen.getHours()) + " : " +  parseInt(lastSeen.getMinutes()) + " : " +  parseInt(lastSeen.getMilliseconds());
   const [value, setValue] = useState('1');

  return (
    <>
      <Flex
        align="center"
        bg="white"
        borderRadius={30}
        height= "auto"
        color="black"
        focusBorderColor="#00FFFF"
        borderColor="white"
        borderWidth={3}
        fontFamily="arial"
        textAlign="center"
        fontSize="md"
        p = {2}
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
          <Text>{props.tagId}</Text>
        </Box>
        <Box
          flex="auto"
          bg="white"
          pt={1}
          pb={1}
          pl={4}
          pr={1}
        >
          <Text>Last Seen Online:</Text>
        </Box>
        <Box
          flex="auto"
          bg="white"
          pt={1}
          pb={1}
          pl={1}
          pr={4}
        >
          <Text>{lastSeenAll}</Text>
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
          <Text>Battery</Text>
        </Box>
      </Flex>

      <Flex
        direction="column"
        bg="white"
        borderRadius={30}
        color="black"
        borderColor="white"
        borderWidth={3}
        fontFamily="arial"
        textAlign="left"
        fontSize="sm"
        p={2}
        mb={4}
      >
        <Box flex="1" bg="white" p={4}>
          <Flex>
            <Box flex="1" bg="white" pl={4} pr={4}>
                <Text>Tag Alias:</Text>
                <Text>{props.tag.alias}</Text>
            </Box>
            <Box flex="1" bg="white" pl={4} pr={4}>
                <Text>
                    Current Coordinates: 
                </Text>
                <Text>
                    x &nbsp; {props.tag.x}
                </Text>
                <Text>
                    y &nbsp; {props.tag.y}
                </Text>
                <Text>
                    z &nbsp; {props.tag.z}
                </Text>
            </Box>
          </Flex>
        </Box>
        <Box flex="1" bg="white" p={4}>
          <Flex>
            <Box flex="1" bg="white" pl={4} pr={4}>
                <Text>Fixed Height:</Text>
                <Text>{props.tag.height}</Text>
            </Box>
          </Flex>
        </Box>

        <Box flex="1" bg="white" p={4}>
          <Flex height="auto">
            <Box flex="1" bg="white" pl={4} pr={4}>
              <Button>Show on map</Button>
            </Box>
            <Box flex="1" bg="white" pl={4} pr={4}>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

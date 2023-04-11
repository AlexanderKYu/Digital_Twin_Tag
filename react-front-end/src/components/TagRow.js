import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function TagRow(props) {
  const lastSeen = new Date(props.tag.timestamp * 1000);
  const lastSeenAll =
    parseInt(lastSeen.getFullYear()) +
    "-" +
    parseInt(lastSeen.getMonth()) +
    "-" +
    parseInt(lastSeen.getDate()) +
    " / " +
    parseInt(lastSeen.getHours()) +
    ":" +
    parseInt(lastSeen.getMinutes()) +
    ":" +
    parseInt(lastSeen.getMilliseconds());
  const [value, setValue] = useState("1");

  return (
    <>
          
            <AccordionItem>
              <AccordionButton>
                <Flex
                  align="center"
                  bg="white"
                  width="100%"
                  color="black"
                  borderColor="white"
                  letterSpacing="1px"
                  textAlign="center"
                  fontSize="md"
                >
                  <Box
                    flex="1"
                    flexGrow="1"
                    bg="gray.900"
                    color="white"
                    borderRadius={50}
                    p={1.5}
                  >
                    <Text>{props.tagId}</Text>
                  </Box>
                  <Box flex="1" flexGrow="4" fontFamily="arial">
                    <Text>Last Online: {lastSeenAll}</Text>
                  </Box>

                  <Box flex="1" flexGrow="0.5" fontFamily="arial">
                    <Text>87%</Text>
                  </Box>
                </Flex>
              </AccordionButton>
              <AccordionPanel>
                <Flex
                  direction="column"
                  bg="white"
                  color="black"
                  borderColor="white"
                  textAlign="center"
                  fontSize="md"
                  width="100%"
                  p={6}
                >
                  <Box flex="1" pl={10} pr={10} pb={3}>
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      letterSpacing="1px"
                      mb={2}
                    >
                      TAG ALIAS
                    </Text>
                    <Box
                      borderColor="black"
                      borderRadius={30}
                      borderWidth="2.5px"
                      fontSize="2xl"
                      p={1.5}
                    >
                      <Text>{props.tag.alias}</Text>
                    </Box>
                  </Box>
                  <Box flex="1" pt={3} pl={10} pr={10} pb={3}>
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      letterSpacing="1px"
                      mb={2}
                    >
                      CURRENT COORDINATES
                    </Text>
                    <Box
                      borderColor="black"
                      borderRadius={30}
                      borderWidth="2.5px"
                      fontSize="2xl"
                      p={1.5}
                      mb={2}
                    >
                      <Text>X &nbsp; {props.tag.x}</Text>
                    </Box>
                    <Box
                      borderColor="black"
                      borderRadius={30}
                      borderWidth="2.5px"
                      fontSize="2xl"
                      p={1.5}
                      mb={2}
                    >
                      <Text>Y &nbsp; {props.tag.y}</Text>
                    </Box>
                  </Box>
                  <Box flex="1" pt={3} pl={10} pr={10} pb={3}>
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      letterSpacing="1px"
                      mb={2}
                    >
                      ZONE
                    </Text>
                    <Box
                      borderColor="black"
                      borderRadius={30}
                      borderWidth="2.5px"
                      fontSize="2xl"
                      p={1.5}
                      mb={2}
                    >
                      <Text>X &nbsp; </Text>
                    </Box>
                    <Box
                      borderColor="black"
                      borderRadius={30}
                      borderWidth="2.5px"
                      fontSize="2xl"
                      p={1.5}
                      mb={2}
                    >
                      <Text>Y &nbsp; </Text>
                    </Box>
                  </Box>
                  <Box flex="1" pt={3} pl={10} pr={10} pb={3}>
                    <Button variant="tagBtn" fontSize="2xl" letterSpacing="1px">
                      SHOW ON MAP
                    </Button>
                  </Box>
                </Flex>
              </AccordionPanel>
            </AccordionItem>

    </>
  );
}

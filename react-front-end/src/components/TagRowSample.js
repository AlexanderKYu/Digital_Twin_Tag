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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function TagRowSample (props) {
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
      <Accordion variant="outline" defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Flex
              align="center"
              bg="white"
              borderRadius={30}
              color="black"
              borderColor="white"
              borderWidth={3}
              letterSpacing="1px"
              textAlign="center"
              fontSize="md"
              p={2}
              mb={4}
            >
              <Box
                flex=""
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
              <Box flex="auto" fontFamily="arial" pt={1} pb={1} pl={4} pr={1}>
                <Text>Last Online:</Text>
              </Box>
              <Box
                flex="auto"
                fontFamily="arial"
                pt={1}
                pb={1}
                pl={1}
                pr={4}
              >
                <Text>{lastSeenAll}</Text>
              </Box>
              <Box
                flex="0.5"
                borderRadius={10}
                fontFamily="arial"
                pt={1}
                pb={1}
                pl={4}
                pr={4}
              >
                <Text>87%</Text>
              </Box>
            </Flex>
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Flex
              direction="column"
              bg="white"
              borderRadius={30}
              color="black"
              borderColor="white"
              borderWidth={3}
              textAlign="center"
              fontSize="md"
              p={6}
              mb={4}
            >
              <Box flex="1" pt={3} pl={10} pr={10} pb={3}>
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
                <Button variant="tagBtn" fontSize="2xl" letterSpacing="1px">
                  SHOW ON MAP
                </Button>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

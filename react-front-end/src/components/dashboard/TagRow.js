import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Image,
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
          {/* BUTTON */}
          {/* flex for accordian button */}
          <Flex
            align="center"
            bg="#21262d"
            width="100%"
            color="white"
            letterSpacing="1px"
            textAlign="center"
            fontSize="17px"
            fontFamily="arial"
          >
            {/* box for wip on accordian button */}
            <Box
              flex="1"
              flexGrow="0.2"
              color="white"
              borderRadius={50}
              p={1.5}
              pb={3}
            >
              {!props.tag.inactive && (
                <Image
                  mt={2}
                  boxSize="12px"
                  src="/activeTag.png"
                  alt="Active Tag"
                />
              )}

              {props.tag.inactive && (
                <Image
                  mt={2}
                  boxSize="12px"
                  src="/inactiveTag.png"
                  alt="Inactive Tag"
                />
              )}
            </Box>
            <Box flex="1" flexGrow="1" color="white" borderRadius={50} p={1.5}>
              <Text>{props.tag.alias}</Text>
            </Box>
            {/* box for last seen */}
            <Box flex="1" flexGrow="4">
              <Text>Last Online: {lastSeenAll}</Text>
            </Box>
            {/* box for battery */}
            <Box flex="1" flexGrow="0.5">
              <Text>{props.tag.status}</Text>
            </Box>
          </Flex>
        </AccordionButton>
        {/* PANEL */}
        <AccordionPanel>
          {/* flex for panel */}
          <Flex
            direction="row"
            bg="#21262d"
            color="white"
            fontSize="17px"
            letterSpacing="1px"
            textAlign="center"
            borderRadius={30}
          >
            {/* flex for panel left */}
            <Flex width="50%" direction="column" pl={2} pr={2}>
              {/* tag ID */}
              <Box mb={6}>
                <Text fontSize="18px" mb={2}>
                  TAG ID
                </Text>
                <Box
                  borderWidth={0.2}
                  borderRadius={50}
                  p={1.5}
                  fontFamily="arial"
                >
                  <Text>{props.tagId}</Text>
                </Box>
              </Box>
              {/* current coordinates */}
              <Box mb={6}>
                <Text fontSize="18px" mb={2}>
                  CURRENT COORDINATES
                </Text>
                <Box
                  borderWidth={0.2}
                  borderRadius={50}
                  p={1.5}
                  mb={1.5}
                  fontFamily="arial"
                >
                  <Text>X &nbsp; {props.tag.x}</Text>
                </Box>
                <Box
                  borderWidth={0.2}
                  borderRadius={50}
                  p={1.5}
                  fontFamily="arial"
                >
                  <Text>Y &nbsp; {props.tag.y}</Text>
                </Box>
              </Box>
              {/*last seen*/}
              <Box>
                <Text fontSize="18px" mb={2}>
                  LAST ONLINE
                </Text>
                <Box
                  borderWidth={0.2}
                  borderRadius={50}
                  p={1.5}
                  fontFamily="arial"
                >
                  <Text>{lastSeenAll}</Text>
                </Box>
              </Box>
            </Flex>

            {/* flex for panel right */}
            <Flex width="50%" direction="column" pl={2} pr={2}>
              {/* zones */}
              <Box mb={6}>
                <Text fontSize="18px" mb={2}>
                  ZONE
                </Text>
                <Box
                  borderWidth={0.2}
                  borderRadius={50}
                  p={1.5}
                  mb={1.5}
                  fontFamily="arial"
                >
                  <Text>{props.tag.zone}</Text>
                </Box>
              </Box>
              {/* battery */}
              <Box mb={6}>
                <Text fontSize="18px" mb={2}>
                  BATTERY
                </Text>
                <Box
                  borderWidth={0.2}
                  borderRadius={50}
                  p={1.5}
                  fontFamily="arial"
                >
                  <Text>{props.tag.status}</Text>
                </Box>
              </Box>
              <Box mb={2}>
                <Text fontSize="18px" mb={2}>
                  STATUS
                </Text>
                <Box
                  borderWidth={0.2}
                  borderRadius={50}
                  p={1.5}
                  fontFamily="arial"
                >
                  <Text>{props.tag.inactive} </Text>

                  {!props.tag.inactive && <Text>Active</Text>}

                  {props.tag.inactive && <Text>Inactive</Text>}
                </Box>
              </Box>
            </Flex>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
 
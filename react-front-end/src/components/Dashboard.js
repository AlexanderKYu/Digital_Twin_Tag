import { ReactNode } from "react";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import AllTag from "./TagAll.js";
import ZoneRow from "./ZoneRow.js";

export default function Dashbooard() {
  return (
    <>
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="pink">
          <Flex mt={0} bg="black" color="white">
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              pr={10}
              pl={10}
            >
                {/* MAP */}
              <Box p={10} borderColor="white" borderWidth={2} borderRadius={20} > 
                <Text>MAP</Text>
              </Box>
            </Box>
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              bg="black"
              pr={10}
              pl={10}
            >
                {/* TAGS */}
              <Box p={10} borderColor="white" borderWidth={2} borderRadius={20}  height="auto" mb={10}>
              <Text color="white" fontSize="5xl" mb={2} text-align="left">
              TAGS
            </Text>
                <AllTag></AllTag>
              </Box>

              {/* ZONES */}
              <Box p={10} borderColor="white" borderWidth={2} borderRadius={20} >
                <ZoneRow></ZoneRow>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    </>
  );
}

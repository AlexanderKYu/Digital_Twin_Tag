import { ReactNode } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import AllTag from "./TagAll.js";
import ZoneRow from "./ZoneRow.js";
import ZoneRowB from "./ZoneRowB.js";
import FloorMap from "./FloorMap.js";

export default function Dashbooard({tagData}) {
  return (
    <>
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="pink">
          <Flex mt={0} bg="black" color="white">
            <Box flex="1" flexGrow="0.5" minH="100vh" pr={10} pl={10}>
              {/* MAP */}
              <Box p={10} height="auto" borderColor="white" borderWidth={2} borderRadius={20} color="white" mb={10}>
                <Text color="white" fontSize="5xl" mb={2}>
                  FLOOR MAP
                </Text>
                <Box bg="white" borderRadius={20} pr={8} pb={8} pl={2} pt={2}>
                <FloorMap tagData={tagData}></FloorMap>
                </Box>
              </Box>
              {/* ZONES */}
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
              <Box
                p={10}
                borderColor="white"
                borderWidth={2}
                borderRadius={20}
                height="auto"
                mb={10}
              >
                <Text color="white" fontSize="5xl" mb={2}>
                  TAGS
                </Text>
                <AllTag tagData={tagData}></AllTag>
              </Box>

              {/* ZONES */}
            </Box>
          </Flex>
        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    </>
  );
}

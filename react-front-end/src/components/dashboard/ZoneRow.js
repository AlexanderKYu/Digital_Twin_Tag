import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function ZoneRow() {
  return (
    <>

          {/* ZONE */}
          <Box
            flex="1"
            p={10}
            bg="black"
            color="white"
          >
            <Text color="white" fontSize="5xl" text-align="left" mb={4}>
              ZONE A
            </Text>
            <Flex>
              <Text fontSize="2xl" pt={2} pb={4} pl={5} pr={5}>
                Zone Alias
              </Text>
              <Box
                flexGrow="1"
                borderColor="white"
                borderWidth={2}
                borderRadius={10}
                fontSize="2xl"
                mb={4}
                p={6}
              >
                A
              </Box>

              <Text fontSize="2xl" pt={2} pb={4} pl={5} pr={5}>
                Current Coordinates
              </Text>
              <Box
                flexGrow="1"
                borderColor="white"
                borderWidth={2}
                borderRadius={15}
                fontSize="2xl"
                mb={4}
                mr={2}
                p={2}
              >
                X &nbsp; 23.51
              </Box>
              <Box
                flexGrow="1"
                borderColor="white"
                borderWidth={2}
                borderRadius={15}
                fontSize="2xl"
                mb={4}
                p={2}
              >
                Y &nbsp; 9.97
              </Box>
            </Flex>

            <Flex
              align="center"
              bg="white"
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
                <Text>373777</Text>
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
                <Text>Last Seen: 4-10-2023 / 11:16:22</Text>
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
                <Text>87%</Text>
              </Box>
            </Flex>
            <Flex
              align="center"
              bg="white"
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
                <Text>373777</Text>
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
                <Text>Last Seen: 4-10-2023 / 11:16:22</Text>
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
                <Text>87%</Text>
              </Box>
            </Flex>
            <Flex
              align="center"
              bg="white"
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
                <Text>373777</Text>
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
                <Text>Last Seen: 4-10-2023 / 11:16:22</Text>
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
                <Text>87%</Text>
              </Box>
            </Flex>
          </Box>
    </>
  );
}

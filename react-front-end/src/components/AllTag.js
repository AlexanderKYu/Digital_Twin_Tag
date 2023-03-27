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

export default function AllTag(props) {
  return (
    <>
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="black">
          <Text>Border Left</Text>
        </Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
          <Text>Body</Text>

          <Flex align="center" mt={0} bg="black" color="pink">
            <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="pink">
              //TABLE STARTS HERE //First Component Start
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
                  <Text>Tag #</Text>
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
                <Text>Last Seen Online</Text>
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
              //First Component End //Second Component Start




              <Flex
                direction="column"
                bg="white"
                borderRadius={30}
                height={60}
                color="black"
                borderColor="white"
                borderWidth={3}
                fontFamily="arial"
                textAlign="center"
                fontSize="md"
                p={2}
                mb={4}
              >
                <Box
                  flex="1"
                  bg="red"
                  pl={4}
                  pr={4}
                >
                  <Flex height="auto">
                    <Box
                      bg="green"
                      borderRadius={10}
                      height={20}
                      width={20}
                      pl={4}
                      pr={4}
                    >
                      <Text>
                        Alias
                      </Text>
                      <Input bg="white">
                      
                      </Input>

                    </Box>
                    <Spacer/>
                    <Box
                      bg="pink"
                      borderRadius={10}
                      height={20}
                      width={20}
                      ml={10}
                      pl={4}
                      pr={4}
                    >
                      <Text>
                        Current Coordinates
                      </Text>
                    </Box>
                  </Flex>
                </Box>


                <Box
                  flex="1"
                  bg="purple"
                  pl={4}
                  pr={4}
                >
                  <Flex>
                    <Box
                      flex="1"
                      bg="pink"
                      pl={4}
                      pr={4}
                    ></Box>
                    <Box
                      flex="1"
                      bg="red"
                      pl={4}
                      pr={4}
                    ></Box>
                  </Flex>
                </Box>

                <Box
                  flex="1"
                  bg="green"
                  pl={4}
                  pr={4}
                >
                  <Flex
                    height="auto"
                  >
                    <Box
                      flex="1"
                      bg="pink"
                      pl={4}
                      pr={4}
                    ></Box>
                    <Box
                      flex="1"
                      bg="red"
                      pl={4}
                      pr={4}
                    ></Box>
                  </Flex>
                </Box>
              </Flex>
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

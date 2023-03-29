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
  Button,
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
                color="black"
                borderColor="white"
                borderWidth={3}
                fontFamily="arial"
                textAlign="left"
                fontSize="sm"
                p={2}
                mb={4}
              >
                <Box
                  flex="1"
                  bg="white"
                  p={4}
                >
                  <Flex height="auto">
                    <Box
                      bg="white"
                      borderRadius={10}
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
                      bg="white"
                      borderRadius={10}
                      width={40}
                      ml={10}
                      pl={4}
                      pr={4}
                    >
                      <Text>
                        Current Coordinates: <br/>
                        x 11111 <br/>
                        y 11111 <br/>
                        z 11111
                      </Text>
                    </Box>
                  </Flex>
                </Box>


                <Box
                  flex="1"
                  bg="white"
                  p={4}
                >
                  <Flex>
                    <Box
                      flex="1"
                      bg="white"
                      pl={4}
                      pr={4}
                    >
                      <Input bg="white">
                      
                      </Input>
                      <Input bg="white">
                      
                      </Input>

                    </Box>
                    <Box
                      flex="1"
                      bg="white"
                      pl={4}
                      pr={4}
                    >PLACEHOLDER</Box>
                  </Flex>
                </Box>

                <Box
                  flex="1"
                  bg="white"
                  p={4}
                >
                  <Flex
                    height="auto"
                  >
                    <Box
                      flex="1"
                      bg="white"
                      pl={4}
                      pr={4}
                    >
                      <Button>
                        Show on map
                      </Button>

                    </Box>
                    <Box
                      flex="1"
                      bg="white"
                      pl={4}
                      pr={4}
                    >PLACEHOLDER</Box>
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

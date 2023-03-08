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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";

export default function WIP_Sample() {
  const [tag, setTag] = useState("");
  const [data, setData] = useState("");
  const [wip, setWip] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const tagChange = (e) => {
    setTag(e.target.value);

    if (e.target.value.length >= 8) {
      const nextField = document.querySelector("[name=wipNumber]");
      console.log(e.target.value);
      console.log(nextField);
      if (nextField !== null) {
        nextField.focus();
      }
    }
  };

  const wipChange = (e) => {
    setWip(e.target.value);

    if (e.target.value.length >= 5) {
      console.log(e.target.value);

      var jsonData = {
        tagNumber: tag,
        wipNumber: wip,
      };

      const aliasData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      };

      // fetch('/link-wip', aliasData).then(res => res.json()).then(data => {
      //     setData("Test String");
      //   });

      const data = "test string";
      console.log(data);
      setConfirmation(data);
    }
  };

  return (
    <>
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
          <Flex align="center" mt={0} bg="pink" color="white">
            <Box flex="1" flexGrow="0.5" minH="100vh" p={10} bg="black" borderRight="solid" border-color="white" border-width="4px">
              <Text fontSize="3xl">SCAN TAG</Text>
              <Input
                focusBorderColor="red"
                bg="white"
                borderRadius={150}
                placeholder="Eliko Tag"
                size="md"
                mt={2}
                mb={5}
                value={tag}
                onChange={tagChange}
                name="tagNumber"
                autoFocus
              />
              <Text fontSize="3xl">SCAN WIP</Text>

              <Input
                focusBorderColor="gray.900"
                bg="white"
                borderRadius={150}
                placeholder="WIP Number"
                size="md"
                mt={2}
                value={wip}
                onChange={wipChange}
                name="wipNumber"
              />
            </Box>
            <Box flex="1" flexGrow="0.5" minH="100vh" p={10} bg="black">
              <Text fontSize="3xl" mb={2}>SEARCH</Text>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.900" />}
                />
                <Input type="" placeholder="" 
                focusBorderColor="gray.900"
                bg="white"
                borderRadius={150}
                size="md"
                />
              </InputGroup>
            </Box>
          </Flex>
        </Box>
        <Box flex="1" flexGrow="0.5" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    </>
  );
}

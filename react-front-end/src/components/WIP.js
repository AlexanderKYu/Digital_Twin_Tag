import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Input,
  Flex,
  Text,
  InputGroup,
  Alert,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function WIP() {
  const [tag, setTag] = useState("");
  const [data, setData] = useState("");
  const [wip, setWip] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const tagChange = (e) => {
    if (e.target.value.length <= 8) {
      setTag(e.target.value);
    } else if (e.target.value.length >= 8) {
      const nextField = document.querySelector("[name=wipNumber]");
      console.log(e.target.value);
      console.log(nextField);
      if (nextField !== null) {
        nextField.focus();
      }
    }
  };

  const wipChange = (e) => {
    if (e.target.value.length <= 5) {
      setWip(e.target.value);
    }
  };

  const clear = (e) => {
    setTag("");
    setWip("");
    setConfirmation("");

    const nextSelect = document.querySelector("[name=tagNumber]");
    if (nextSelect !== null) {
      nextSelect.focus();
    }
  };

  useEffect(() => {
    if (wip.length >= 5) {
      console.log(wip);

      var jsonData = {
        tagNumber: tag,
        wipNumber: wip,
      };

      const aliasData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      };

      fetch("/link-wip", aliasData)
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
          console.log(data.data);
          setConfirmation(data.data);
        });

      const nextSelect = document.querySelector("[name=scanBtn]");
      if (nextSelect !== null) {
        nextSelect.focus();
      }
    }
  }, [wip]);

  return (
    <>
      {confirmation && (
        <Alert
          status="success"
          variant="solid"
          fontFamily="Arial"
          bg="teal.600"
        >
          {confirmation}
        </Alert>
      )}
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
          <Flex align="center" mt={0} bg="black" color="white">
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              pt={10}
              pb={10}
              pl={20}
              pr={20}
              bg="black"
              borderRight="solid"
              border-color="white"
              border-width="4px"
            >
              <Text fontSize="5xl">TAG</Text>
              <Input
                bg="white"
                borderRadius={150}
                size="lg"
                color="black"
                mt={2}
                mb={5}
                focusBorderColor="teal.600"
                borderColor="white"
                borderWidth={3}
                fontFamily="arial"
                textAlign="center"
                fontSize="2xl"
                value={tag}
                onChange={tagChange}
                name="tagNumber"
                autoFocus
              />
              <Text fontSize="5xl">WIP</Text>

              <Input
                bg="white"
                borderRadius={150}
                size="lg"
                color="black"
                mt={2}
                focusBorderColor="teal.600"
                borderColor="white"
                borderWidth={3}
                fontFamily="arial"
                textAlign="center"
                fontSize="2xl"
                value={wip}
                onChange={wipChange}
                name="wipNumber"
                mb={5}
              />

              <Button
                onClick={clear}
                bg="white"
                color="black"
                borderRadius={150}
                size="lg"
                mt={6}
                fontSize="xl"
                name="scanBtn"
                borderColor="white"
                borderWidth={3}
                _focus={{
                  borderColor: "teal.600",
                  borderWidth: 3,
                  bg: "teal.600",
                  color: "white",
                }}
                _hover={{ bg: "teal.600", color: "white" }}
              >
                <ArrowForwardIcon></ArrowForwardIcon>
              </Button>
            </Box>
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              pt={10}
              pb={10}
              pl={20}
              pr={20}
              bg="black"
            >
              <Text fontSize="5xl">SEARCH / RECHERCHE</Text>
              <InputGroup>
                <Input
                  type=""
                  placeholder=""
                  bg="white"
                  borderRadius={150}
                  size="lg"
                  color="black"
                  mt={2}
                  focusBorderColor="teal.600"
                  borderColor="white"
                  borderWidth={3}
                  fontFamily="arial"
                  textAlign="center"
                  fontSize="2xl"
                />
              </InputGroup>


            </Box>
          </Flex>
        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    </>
  );
}

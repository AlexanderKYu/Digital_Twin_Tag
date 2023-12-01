import { useState } from "react";
import {
  Box,
  Input,
  Flex,
  Text,
  InputGroup,
  Alert,
  Button,
  InputRightElement,
  AlertIcon,
  AlertDescription,
  CloseButton
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import TagData from "./WipRow.js";

export default function WIP() {
  const [tag, setTag] = useState("");
  const [wip, setWip] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [connectedTags, setConnectedTags] = useState([]);
  const [lowBatt, setlowBatt] = useState("");
  const [status, setStatus] = useState(false);

  const tagChange = (e) => {
    if (e.target.value.length <= 6) {
      setTag(e.target.value);
    }
    if (e.target.value.length >= 6) {
      const nextField = document.querySelector("[name=wipNumber]");

      var jsonData = {
        tagNumber: "0x" + e.target.value,
      };
      const aliasData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      };

      fetch("/link-battery", aliasData)
        .then((res) => res.json())
        .then((data) => {
          setlowBatt(data.status);
        });

      if (nextField !== null) {
        nextField.focus();
      }
    }
  };

  const wipChange = (e) => {
    if (e.target.value.length >= 12) {
      if (e.target.value.slice(0, 5) === "00000") {
        setWip(e.target.value.slice(5, 11) + ".0");
      } else if (e.target.value.slice(0, 4) === "0000") {
        setWip(
          e.target.value.slice(4, 10) + "." + e.target.value.slice(10, 11)
        );
      } else if (e.target.value.slice(0, 3) === "000") {
        setWip(e.target.value.slice(3, 9) + "." + e.target.value.slice(9, 11));
      }
    } else {
      setWip(e.target.value);
    }
  };

  const sendAndClear = (e) => {
    var jsonData = {
      tagNumber: "0x" + tag,
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
        if (data.success) {
          setStatus(true);
          let temp = connectedTags;
          temp.unshift(data.tagData);

          if (connectedTags.length >= 10) {
            temp.pop();
          }

          setConnectedTags(temp);
          setTag("");
          setWip("");
          setlowBatt("");

          const nextSelect = document.querySelector("[name=tagNumber]");
          if (nextSelect !== null) {
            nextSelect.focus();
          }
        } else {
          setStatus(false);
        }
        setConfirmation(data.data);
      });
  };

  const tagKeyPress = (e) => {
    if (e.key === "Enter") {
      const nextSelect = document.querySelector("[name=wipNumber]");
      if (nextSelect !== null) {
        nextSelect.focus();
      }
    }
  };

  const wipKeyPress = (e) => {
    if (e.key === "Enter" && wip !== "") {
      let nextSelect = document.querySelector("[name=scanBtn]");

      if (nextSelect !== null) {
        nextSelect.focus();
        sendAndClear();
      }
    }
  };

  return (
    <>
      {confirmation && !status && (
        <Alert status="error" variant="solid" fontFamily="Arial" bg="#a3142e">
        <AlertIcon />
        <Box>
          <AlertDescription>
            {confirmation}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='end'
          position='absolute'
          right={1}
          top={2}
          onClick={()=>{
            setConfirmation('');
          }}
        />
        
      </Alert>
      )}
      {confirmation && status && (
        <Alert status="success" variant="solid" fontFamily="Arial" bg="#009cd9">
        <AlertIcon />
        <Box>
          <AlertDescription>
            {confirmation}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='end'
          position='absolute'
          right={1}
          top={2}
          onClick={()=>{
            setConfirmation('');
          }}
        />
        
      </Alert>
      )}
      <Flex align="center" mt={0} bg="#0d1117" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="#0d1117"></Box> {/* left border */}
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="#0d1117"> {/* all middle */}
          <Flex align="center" mt={0} bg="#0d1117" color="white"> {/* flex for middle */}
            <Box
              flex="1"
              flexGrow="0.5"
              minH="100vh"
              pt={10}
              pb={10}
              pl={20}
              pr={20}
              bg="#0d1117"
              align="center"
              borderRight="solid"
              border-color="white"
              border-width="4px"
            > {/* left side */}
              <Text fontSize="5xl" textAlign="center">TAG</Text>

              <InputGroup>
                <Input
                  variant="wipInput"
                  value={tag}
                  onChange={tagChange}
                  name="tagNumber"
                  onKeyPress={tagKeyPress}
                  autoFocus
                />

                {lowBatt && parseInt(lowBatt) > 20 && (
                  <InputRightElement
                    bg="#009cd9"
                    color="white"
                    width="20"
                    mt={3}
                    mr={2}
                    borderRadius="150"
                  >
                    <Text> {lowBatt}</Text>
                  </InputRightElement>
                )}

                {lowBatt && parseInt(lowBatt) < 20 && (
                  <InputRightElement
                    bg="#a3142e"
                    color="white"
                    width="20"
                    mt={3}
                    mr={2}
                    borderRadius="150"
                  >
                    <Text> {lowBatt}</Text>
                  </InputRightElement>
                )}
              </InputGroup>
              <Text fontSize="5xl" textAlign="center">WIP</Text>

              <Input
                variant="wipInput"
                value={wip}
                onChange={wipChange}
                name="wipNumber"
                onKeyPress={wipKeyPress}
              />

              <Button
                mt={2}
                onClick={sendAndClear}
                name="scanBtn"
                variant="wipBtn"
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
              bg="#0d1117"
            > {/* right side */}
              <Text fontSize="5xl" textAlign="center">SEARCH / RECHERCHE</Text>
              <InputGroup>
                <Input variant="wipInput" type="" placeholder="" />
              </InputGroup>
              {connectedTags.map((tagValue) => (
                <TagData key={tagValue.number} data={tagValue}></TagData>
              ))}
            </Box>
          </Flex>
        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="#0d1117"></Box> {/* right border */}
      </Flex>
      </>
  );
}

import { ReactNode } from "react";
import { Box, Flex, Accordion } from "@chakra-ui/react";
import TagRow from "./TagRow.js";
import { sampleData } from "./SampleData";

export default function TagAll(props) {
  const tagJson = sampleData;
  const tagKeys = Object.keys(tagJson);

  return (
    <>
      <Flex align="center" mt={0} bg="black" color="white">
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
        <Box flex="1" flexGrow="2" minH="100vh" mt={20} bg="black">
              <Accordion variant="outline" defaultIndex={[-1]} allowMultiple>
              {tagKeys.map((key) => (
                <TagRow key={key} tagId={key} tag={tagJson[key]}></TagRow>
              ))}
              </Accordion>

        </Box>
        <Box flex="1" flexGrow="0.2" minH="100vh" mt={20} bg="black"></Box>
      </Flex>
    </>
  );
}

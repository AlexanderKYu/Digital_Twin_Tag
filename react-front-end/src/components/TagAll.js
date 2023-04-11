import { ReactNode } from "react";
import { Box, Flex, Accordion } from "@chakra-ui/react";
import TagRow from "./TagRow.js";
import { sampleData } from "./SampleData";

export default function TagAll(props) {
  const tagJson = sampleData;
  const tagKeys = Object.keys(tagJson);

  return (
    <>
   
              <Accordion variant="outline" defaultIndex={[-1]} allowMultiple>
              {tagKeys.map((key) => (
                <TagRow key={key} tagId={key} tag={tagJson[key]}></TagRow>
              ))}
              </Accordion>

      

    </>
  );
}

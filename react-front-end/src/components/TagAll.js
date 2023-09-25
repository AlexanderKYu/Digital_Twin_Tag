import { ReactNode } from "react";
import { Box, Flex, Accordion } from "@chakra-ui/react";
import TagRow from "./TagRow.js";

export default function TagAll({tagData}) {
  const tagKeys = Object.keys(tagData);
  console.log(tagData);

  return (
    <>
   
              <Accordion variant="outline" defaultIndex={[-1]} allowMultiple>
              {tagKeys.map((key) => (
                <TagRow key={key} tagId={key} tag={tagData[key]}></TagRow>
              ))}
              </Accordion>

      

    </>
  );
}

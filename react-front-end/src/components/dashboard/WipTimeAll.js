import { ReactNode } from "react";
import { Box, Flex, Accordion } from "@chakra-ui/react";
import WipTime from "./WipTimeRow.js";

export default function WipTimeAll({ tagData }) {
  const tagKeys = Object.keys(tagData);
  console.log(tagData);

  return (
    <>
      <Accordion variant="outline" defaultIndex={[-1]} allowMultiple>
        {tagKeys.map((key) => (
          <WipTime key={key} tagId={key} tag={tagData[key]}></WipTime>
        ))}
      </Accordion>
    </>
  );
}

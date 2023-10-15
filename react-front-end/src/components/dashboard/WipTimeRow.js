import { ReactNode, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function WipTimeRow(props) {
  return (
    <>
      <TableContainer>
        <Table variant="wipTable">
          <Thead>
            <Tr>
              <Th>WIP</Th>
              <Th>Start Time</Th>
              <Th>End Time</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td><Input variant='endTimeInput' placeholder='Input End Time'/></Td>
              <Td><Button variant="editBtn">Submit</Button></Td>
            </Tr>
            <Tr>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td><Input variant='endTimeInput' placeholder='Input End Time'/></Td>
              <Td><Button variant="editBtn">Submit</Button></Td>
            </Tr>
            <Tr>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td><Input variant='endTimeInput' placeholder='Input End Time'/></Td>
              <Td><Button variant="editBtn">Submit</Button></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

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
              <Th>Last Seen</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td><Button variant="editBtn">Edit End Time</Button></Td>
            </Tr>
            <Tr>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td>Edit</Td>
            </Tr>
            <Tr>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td>00000</Td>
              <Td>Edit</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

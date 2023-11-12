import { ReactNode, useState, useEffect} from "react";

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


export default function WipTimeRow({overwrittenWips}) {
  const [endTimes, setEndTimes] = useState([]);
  const handleChange = (e, i) => {
    setEndTimes(oldEndTimes => {
      const newEndTimes = oldEndTimes.map((event, index) => {
        if (i === index) {
          return e;
        } else {
          return event;
        }
      });
      return newEndTimes;
    })
  }

  // TODO: call flask to get list of overwritten wips
  // TODO: have button update t-end
  const updateTEnd = (i) =>{
    
  }
  
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
          {overwrittenWips.map((wip, i) => (
          <Tr>
            <Td>{wip['wip']}</Td>
            <Td>{wip['startTime']}</Td>
            <Td>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={endTimes[i]}
                onChange={e=> handleChange(e.target.value, i)}
                /></Td>
            <Td><Button variant="editBtn" onClick={() => updateTEnd(i)}>Submit</Button></Td>
          </Tr>
          ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

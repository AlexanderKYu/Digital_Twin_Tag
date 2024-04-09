import { ReactNode, useState, useEffect} from "react";

import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { API_URL } from "../../config";


export default function WipTimeRow({overwrittenWips, setOverwrittenWips}) {
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

  useEffect(() => {
    fetch(API_URL + "/get-overwritten-wips")
        .then((res) => res.json())
        .then((data) => {
          if(data.status){
            setOverwrittenWips(data.wips)
            let tempEndTimes = []
            for(let wip in data.wips){
              tempEndTimes.push('');
            }
            setEndTimes(tempEndTimes)
          }
        });
  }, []);


  const updateTEnd = (wip, i) =>{
    var jsonData = {
      wip: wip['wip'],
      qty: wip['qty'],
      tEnd: (Date.parse(endTimes[i])/1000),
    };
    const aliasData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    };
    fetch(API_URL + "/update-tend", aliasData)
        .then((res) => res.json())
        .then((data) => {
          // TODO: confirmation banner when t-end is successful
          if(data.status){
            setOverwrittenWips(oldWips => oldWips.filter(w => 
              w.wip !== wip.wip
              ))
          }
        });
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
          <Tr key={wip}>
            <Td>{wip['wip'] + "." + wip['qty']}</Td>
            <Td>{wip['startTime']}</Td>
            <Td>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                value={endTimes[i]}
                onChange={e=> handleChange(e.target.value, i)}
                /></Td>
            <Td><Button variant="editBtn" onClick={() => updateTEnd(wip, i)}>Submit</Button></Td>
          </Tr>
          ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

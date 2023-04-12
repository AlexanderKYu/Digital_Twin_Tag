import { ReactNode, useState, useEffect } from "react";
import {
  Box,
  useDisclosure,
  Image,
  AspectRatio,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Text
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function ZoneTable() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/zoning").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <>
      {(typeof data.zonetags === 'undefined') ? (
        <p>Loading...</p>
      ): (
        data.zonetags.map((zonetag, i) => (
          <p key={i}>{zonetag}</p>

        ))
      )}

    </>
    
  );
}
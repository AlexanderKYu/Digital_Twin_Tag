import { ReactNode } from "react";
import {
  Box,
  useDisclosure,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Stack,
  Text,
  Flex,
  AbsoluteCenter,
  Center,
  Checkbox,
} from "@chakra-ui/react";

export default function Filter({tagData, filterTagData, setFilterTagData}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (e, attribute) => {
    e.preventDefault();
    if(e.target.checked){
      setFilterTagData(oldTagData => {
        var results = Object.keys(oldTagData).reduce(function(acc, val) {
          if(oldTagData[val][attribute] === '34343')  acc[val] = oldTagData[val];
        return acc;
        }, {});
        return results;
      });
    } else {
      setFilterTagData(tagData);
    }
    
  }


  return (
    <>
      <Flex direction="row" align="center" justify-content="center" width="full" mb={2}>
        <Box flex="1"> 
            
        </Box>
          <Box flex="8">
            <Text color="white" fontSize="5xl" text-align="inherit">
              TAGS
            </Text>
          </Box>
          <Box flex="1" align="center">
            <Menu variant="filterDrop" closeOnSelect={false}>
              <MenuButton>
                <Image
                  mt={2}
                  boxSize="20px"
                  src="/filterIcon.png"
                  alt="Filter List"
                />
              </MenuButton>
              <MenuList>
                <MenuItem><Checkbox colorScheme="blue" onChange={(e) => handleClick(e, "alias")}>Filter 1</Checkbox></MenuItem>
              </MenuList>
            </Menu>
          </Box>
      </Flex>
    </>
  );
}
 
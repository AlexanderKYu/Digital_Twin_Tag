import {
  Box,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Flex,
  Checkbox,
  Input,
} from "@chakra-ui/react";

export default function Filter({setFilters, searchValue, setSearchValue}) {

  const handleClick = (e, attribute) => {
    e.preventDefault();
    if(e.target.checked){
      setFilters(oldFilters => {
        return {...oldFilters, [attribute]: true}
      });
    } else {
      setFilters(oldFilters => {
        return {...oldFilters, [attribute]: false}
      });
    }
    
  }

  const searchTags = (e) => {
    setSearchValue(e.target.value);
  }


  return (
    <>
      <Flex direction="row" align="center" justify-content="center" width="full" mb={2}>
        <Box flex="1"> 
            
        </Box>
          <Box flex="6" align="right">
            <Text color="white" fontSize="5xl" text-align="inherit">
              TAGS
            </Text>
          </Box>
          <Box flex="4" m={2}>
            <Input onChange={searchTags} value={searchValue} variant="wipInput" fontFamily="arial" type="" placeholder="" />
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
                <MenuItem><Checkbox colorScheme="blue" onChange={(e) => handleClick(e, "active")}>Active</Checkbox></MenuItem>
                <MenuItem><Checkbox colorScheme="blue" onChange={(e) => handleClick(e, "inactive")}>Inactive</Checkbox></MenuItem>
                <MenuItem><Checkbox colorScheme="blue" onChange={(e) => handleClick(e, "rush")}>Rush</Checkbox></MenuItem>
              </MenuList>
            </Menu>
          </Box>
      </Flex>
    </>
  );
}
 
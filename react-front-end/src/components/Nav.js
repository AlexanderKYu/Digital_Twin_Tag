import { ReactNode } from "react";
import {
  Box,
  Container,
  useDisclosure,
  useColorModeValue,
  Image,
  AspectRatio,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Button,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"
import AuthNav from './auth-nav';


export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  function handleDashClick (){

    navigate("/dashboard")

  }

  function handleWipClick (){

    navigate("/wip")

  }
  

  return (
    <div className="navigation">
      <HStack bg="black" spacing="5px" px={5} h="3em">
        <Box>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  color="white"
                  colorScheme="black"
                >
                  {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                </MenuButton>

                <MenuList>
                  <MenuItem onClick={handleDashClick}>Dashboard</MenuItem>
                  <MenuItem onClick={handleWipClick}> WIP Tag Search</MenuItem>
                  <MenuItem>Menu Item 3</MenuItem>
                  <MenuItem>Menu Item 4</MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
        </Box>
        <Box w="200px" h="3em">
          <AspectRatio maxW="200px" ratio={21 / 3}>
            <Image
              mt={2}
              boxSize="150px"
              src="/bauerLogo.png"
              alt="Bauer Logo"
            />  
          </AspectRatio>
        <Box pos="absolute" top={2} right={10}>
              <AuthNav />
          </Box>
        </Box>
      </HStack>
      {/* <li>
        <Link to="/">Login/Signup</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      {isAuthenticated ? (
  <button
    onClick={() => {
      logout();
    }}
  >
    Logout
  </button>
) : (
  <button
    onClick={() => {
      loginWithRedirect();
    }}
  >
    Login
  </button>
)} */}
    </div>


  );

 }

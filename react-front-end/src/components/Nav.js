import { ReactNode } from "react";
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
                  bg="none"
                  _hover={{
                    bg: "none",
                  }}
                >
                  {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                </MenuButton>

                <MenuList></MenuList>
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
        </Box>
      </HStack>
    </>
  );
}

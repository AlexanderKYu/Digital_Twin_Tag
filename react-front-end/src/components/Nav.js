import { ReactNode } from 'react';
import {
  Box,
  Container,
  useDisclosure,
  useColorModeValue,
  Image,
  AspectRatio,
  Input,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.900', 'gray.900')} px={4} h='3em'>
            <AspectRatio maxW='200px' ratio={21 / 3}>
              <Image mt={2} boxSize='150px' src='/bauerLogo.png' alt="Bauer Logo"/>
            </AspectRatio>
      </Box>
    </>
  );
} 
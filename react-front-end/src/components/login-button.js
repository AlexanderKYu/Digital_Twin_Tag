import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button bg="none" color="white" borderRadius={40} pl={5} pr={5} height={9}
    borderColor="white"
    borderWidth={3}
    fontSize="sm"
    _hover={{ bg: "teal.600", color: "white" }}
      onClick={() => loginWithRedirect()}
    >
      Log In/Sign Up
    </Button>
  );
};

export default LoginButton;
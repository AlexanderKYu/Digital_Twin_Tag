import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button colorScheme='gray' size={'sm'}
      onClick={() => loginWithRedirect()}
    >
      Log In/Sign Up
    </Button>
  );
};

export default LoginButton;
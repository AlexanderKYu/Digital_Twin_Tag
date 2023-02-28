import { ReactNode, useState } from 'react';
import {
  Box,
  Container,
  Input,
  Text,
  Alert,
  AlertIcon,
  Flex,
  VStack,
  Spacer
} from '@chakra-ui/react';

export default function WIP() {
    const [tag, setTag] = useState("")
    const [data, setData] = useState("");
    const [wip, setWip] = useState("")
    const [confirmation, setConfirmation] = useState("")

    const tagChange = (e) => {
        setTag(e.target.value);

        if (e.target.value.length >= 8) { 
                const nextField = document.querySelector('[name=wipNumber]');
                console.log(e.target.value);
                console.log(nextField);
                if (nextField !==null) { 
                    nextField.focus();
                }
        }
      };

      const wipChange = (e) => {
          setWip(e.target.value);

          if (e.target.value.length >= 5) { 
            console.log(e.target.value);
            
            var jsonData = { 
                "tagNumber": tag,
                "wipNumber": wip,
            }

            const aliasData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            };

            // fetch('/link-wip', aliasData).then(res => res.json()).then(data => {
            //     setData("Test String");
            //   });

            const data = 'test string'
            console.log(data);
            setConfirmation(data);
        }
        };

    return (
        <>
        <VStack>
            {confirmation && 
            <Alert pos="bottom" status='success'>
                <AlertIcon />
                    {confirmation}
            </Alert>}
            <Container centerContent mt= {8} mb={5}>
                <Text fontSize='2xl' fontWeight= 'medium'>
                    Scan Tag
                </Text>
                <Input 
                    focusBorderColor='gray.900'
                    placeholder = 'Eliko Tag' 
                    size='md'
                    mt={2}
                    value={tag}
                    onChange={tagChange}
                    name = 'tagNumber'
                    autoFocus/>
            </Container>

            <Container centerContent>
                <Text fontSize='2xl' fontWeight= 'medium'>
                    Scan WIP
                </Text>
                <Input 
                    focusBorderColor='gray.900'
                    placeholder = 'WIP Number' 
                    size='md'
                    mt={2}
                    value={wip}
                    onChange={wipChange}
                    name="wipNumber"/>
            </Container>
        </VStack>
        </>
      );
}
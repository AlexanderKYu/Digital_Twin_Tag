import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    bg: 'white',
    color: 'black',
    fontSize: 'xl',
    borderRadius: 150,
    borderColor: 'white',
    _hover: {
        bg: "teal.600", 
        color: "white", 
        outline: { 
            border: "2px solid",
            borderColor: "green.500",
          },
    },

    _focus: {
      borderColor: "teal.600",
      bg: "teal.600",
      color: "white",
      
      }
    },

  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
  },
  // The default size and variant values
  defaultProps: {
  },
})
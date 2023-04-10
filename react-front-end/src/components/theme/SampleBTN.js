import { defineStyleConfig } from '@chakra-ui/react'

export const buttonStyles = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {},

  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
    primary: {
        bg: "blue",
        color: "white",
    },
    wipBtn: {
      
    }
  },
  // The default size and variant values
  defaultProps: {
  },
})
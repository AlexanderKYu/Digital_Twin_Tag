import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  baseStyle: {
    field: {
      borderWidth: 4,
      borderColor: '#FF0000',
      bg: 'red.100',
      },
    },
    sizes: {},
    variant: {
        outline: {
            field: {
              background: "purple",
              border: "1px solid",
              borderColor: "inherit",
              _focus: {
                zIndex: 1,
                borderColor: "#3182ce",
                boxShadow: "0 0 0 1px #3182ce",
              },
              _hover: { borderColor: "gray.300" },
            },
        }

    },
    defaultProps: {
        size: null,
        variant: null,
    },
    

})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
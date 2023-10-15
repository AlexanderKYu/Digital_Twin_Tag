import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    bg: "red",
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
})

const wipInput = definePartsStyle((props) => {
  return {
    field: {
        bg: "white",
        color: "black",
        fontSize: "2xl",
        textAlign:"center",
        borderRadius: "150",
        borderStyle: "none",
        letterSpacing: "1.5",
        mt: "2",
        mb: "8",
        _focus: {
          borderStyle: "none",
          borderColor: "white",
          outlineColor: "#009cd9",
          outlineWidth: 3,
          outlineOffset: 2,
      },
    }
  }
})

const endTimeInput = definePartsStyle((props) => {
  return {
    field: {
        bg: "none",
        color: "whitw",
        fontSize: "16px",
        borderRadius: "150",
        borderWidth: "1px",
        borderColor: "grey.20",
        letterSpacing:"1.5",
        width: "150px",
        textAlign:"center",
        _focus: {
          borderStyle: "none",
          borderColor: "white",
          outlineColor: "#009cd9",
          outlineWidth: 3,
          outlineOffset: 2,
      },
    }
  }
})

const variantFilled = definePartsStyle((props) => {
  return {
    field: {
      fontWeight: "semibold", // change font weight to semibold
    },
  }
})

// Defining a custom variant
const variantCustom = definePartsStyle((props) => {
  const { colorScheme: c } = props
  return {
    field: {
      border: "0px solid",
      bg: "gray.50",
      borderTopRightRadius: "full",
      borderBottomRightRadius: "full",
      _dark: {
        bg: "whiteAlpha.50"
      },

      _hover: {
        bg: "gray.200",
        _dark: {
          bg: "whiteAlpha.100"
        }
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _focusVisible: {
        bg: "gray.200",
        _dark: {
          bg: "whiteAlpha.100"
        }
      },
    },
    addon: {
      border: "0px solid",
      borderColor: "transparent",
      borderTopLeftRadius: "full",
      borderBottomLeftRadius: "full",
      bg: `${c}.500`,
      color: "white",
      _dark: {
        bg: `${c}.300`,
        color: `${c}.900`,
      }
    },
    element: {
      bg: "white",
      rounded: "full",
      border: "1px solid",
      borderColor: "gray.100",
      _dark: {
        bg: "whiteAlpha.50",
        borderColor: "whiteAlpha.100",
      }
    },
  }
})

const variants = {
  wipInput: wipInput,
  filled: variantFilled,
  custom: variantCustom,
  endTimeInput: endTimeInput,
}

const size = {
  md: defineStyle({
    fontSize: "sm",
    px: "4",
    h: "10",
    borderRadius: "none",
  }),
}

const sizes = {
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
})
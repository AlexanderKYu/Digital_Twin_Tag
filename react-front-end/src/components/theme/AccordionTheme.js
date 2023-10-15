import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
  container: defineStyle({
    boxShadow: "sm",
    _focus: {
      boxShadow: "outline",
    },
  }),
});

// Defining a custom variant called outline
const outline = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      border: "none",
      width: "auto",
    },
    button: {
      bg: "#21262d",
      color: "black",
      borderRadius: "50",
      letterSpacing: "1",
      p: "4",
      mb: "3",
      _hover: {
        bg: "#21262d",
        borderRadius: "50",
        p: "4",
        outlineColor: "#009cd9",
        outlineWidth: 3,
        outlineOffset: 2,
      },
      _focus: {
        outlineColor: "#009cd9",
        outlineWidth: 3,
        outlineOffset: 2,
      },
    },
    panel: {
      bg: "#21262d",
      borderRadius: "30",
      p: "5",
      mb: "5",
    },
    icon: {
      bg: "green",
    },
  };
});

const variants = {
  outline,
};

const size = {};

const sizes = {};

export const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {},
});

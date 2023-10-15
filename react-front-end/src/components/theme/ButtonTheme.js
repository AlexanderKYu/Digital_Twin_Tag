import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {},

  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
    wipBtn: {
      bg: "black",
      borderRadius: "150",
      width: "70px",
      outlineColor: "white",
      outlineOffset: "2",
      fontSize: "xlg",
      _hover: {
        bg: "#009cd9",
        outlineColor: "white",
        outlineOffset: 2,
        color: "white",
      },
      _focus: {
        bg: "#009cd9",
        outlineColor: "white",
        outlineOffset: 2,
        color: "white",
      },
    },
    tagBtn: {
      bg: "#0d1117",
      color: "white",
      fontSize: "18px",
      fontWeight:"light",
      letterSpacing: "1.5px",
      borderRadius: 100,
      outlineOffset: "2",
      width: "auto",
      pl: "12",
      pr: "12",
      _hover: {
          bg: "#0d1117",
          outlineColor: "#009cd9",
          outlineWidth: 2,
          outlineOffset: 2,
          color: "white",
      },

      _focus: {
          bg: "#009cd9",
          outlineColor: "white",
          outlineOffset: 2,
          color: "white",
      },
    },
    editBtn: {
      bg: "#0d1117",
      color: "white",
      fontFamily: "antonio",
      fontSize: "15px",
      fontWeight:"light",
      letterSpacing: "1.5px",
      borderRadius: 100,
      outlineOffset: "2",
      width: "auto",

      _hover: {
          bg: "#0d1117",
          outlineColor: "#009cd9",
          outlineWidth: 2,
          outlineOffset: 2,
          color: "white",
      },

      _focus: {
          bg: "#009cd9",
          outlineColor: "white",
          outlineOffset: 2,
          color: "white",
      },
    },
  },
  // The default size and variant values
  defaultProps: {},
});

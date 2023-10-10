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
      bg: "black",
      color: "white",
      fontSize: "sm",
      width:"500px",
      borderRadius: 150,
      outlineColor: "black",
      outlineOffset: "2",
      _hover: {
          bg: "black",
          outlineColor: "#009cd9",
          outlineWidth: 3,
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

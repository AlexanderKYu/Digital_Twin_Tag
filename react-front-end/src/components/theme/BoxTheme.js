import { defineStyleConfig } from "@chakra-ui/react";

export const boxTheme = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {},

  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
    tagRowBox: {
      bg: "black",
      borderRadius: "150",
      width: "70px",
      outlineColor: "white",
      outlineOffset: "2",
      fontSize: "xlg",
    },
  },
  // The default size and variant values
  defaultProps: {},
});

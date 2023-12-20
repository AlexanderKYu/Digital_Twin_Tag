import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

export const menuTheme = definePartsStyle({
  // The styles all button have in common
  baseStyle: {
    button: { 
      _hover: {
          bg: 'red',
      },
      _focus: {
          bg: "teal.600",
        },
    },
    list: {
      // this will style the MenuList component
      py: "5",
      borderTopRadius: "0",
      borderBottomRadius: "12px",
      border: "none",
      bg: "#21262d",
      minWidth:'170px',
      minHeight: '300px',
      mt: "-4px",
      ml: "-20px",
      textAlign:"center",
    },
  
    item: {
      // this will style the MenuItem and MenuItemOption components
      color: "white",
      bg:"#21262d",
      pl: "30px",
      letterSpacing: "1px",
      fontSize: "18px",
      textAlign: "center",
      _hover: {
        bg: "#009cd9",
        borderRadius: "5px",
      },
      _focus: {
        bg: "#009cd9",
      },
    },
    groupTitle: {
      // this will style the text defined by the title prop
      // in the MenuGroup and MenuOptionGroup components
      textTransform: "uppercase",
      color: "white",
      textAlign: "center",
      letterSpacing: "wider",
      opacity: "0.7",
    },
    command: {
      // this will style the text defined by the command
      // prop in the MenuItem and MenuItemOption components
      opacity: "0.8",
      fontFamily: "mono",
      fontSize: "sm",
      letterSpacing: "tighter",
      pl: "4",
    },
    divider: {
      // this will style the MenuDivider component
      my: "4",
      borderColor: "white",
      borderBottom: "2px dotted",
    },
  },

  // Two sizes: sm and md
  sizes: {},
  // Two variants: outline and solid
  variants: {
    filterDrop: {
      button: { 
        _hover: {
            bg: "none",
        },
        _focus: {
            bg: "none",
          },
      },
      list: {
        // this will style the MenuList component
        py: "4",
        borderTopRadius: "8px",
        borderBottomRadius: "8px",
        bg: "#0d1117",
        minWidth:'170px',
        minHeight: 'auto',
        mt: "4px",
        ml: "-20px",
        textAlign:"center",
      },
    
      item: {
        // this will style the MenuItem and MenuItemOption components
        color: "white",
        bg:"#0d1117",
        pl: "30px",
        letterSpacing: "1px",
        fontSize: "18px",
        textAlign: "center",
        _hover: {
          bg: "none",
        },
        _focus: {
          bg: "none",
        },
      },
      groupTitle: {
        // this will style the text defined by the title prop
        // in the MenuGroup and MenuOptionGroup components
        textTransform: "uppercase",
        color: "red",
        textAlign: "center",
        letterSpacing: "wider",
        opacity: "0.7",
      },
      command: {
        // this will style the text defined by the command
        // prop in the MenuItem and MenuItemOption components
        opacity: "0.8",
        fontFamily: "mono",
        fontSize: "sm",
        letterSpacing: "tighter",
        pl: "4",
      },
      divider: {
        // this will style the MenuDivider component
        my: "4",
        borderColor: "white",
        borderBottom: "2px dotted",
      },
    },
  },
  // The default size and variant values
  defaultProps: {},
});

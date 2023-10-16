import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
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
    borderRadius: "0",
    border: "none",
    bg: "#0d1117",
    minWidth:'120px',
    borderWidth: '1px',
    border: 'solid',
    borderRightColor: '#0d1117',
    borderLeftColor: '#0d1117',
    borderTopColor: '#0d1117',
    borderBottomColor: 'white',
    mt: "-4px",
  },

  item: {
    // this will style the MenuItem and MenuItemOption components
    color: "white",
    bg:"#0d1117",
    _hover: {
      bg: "#009cd9",
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
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });

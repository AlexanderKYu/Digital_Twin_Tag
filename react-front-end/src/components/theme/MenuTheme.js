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
    bg: "#21262d",
    minWidth:'170px',
    minHeight: '300px',
    mt: "-4px",
    ml: "-20px",
    textAlign:"center",
    borderBottomRadius: "12px",
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
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });

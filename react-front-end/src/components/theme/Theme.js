import { extendTheme } from '@chakra-ui/react'
import { menuTheme as Menu } from './MenuTheme'
import { buttonTheme as Button } from './ButtonTheme'
import { accordionTheme as Accordion} from './AccordionTheme'
import { inputTheme as Input} from './InputTheme'

const theme = extendTheme({
  fonts: {
    heading: `'Antonio',sans-serif`,
    body: `'Antonio', sans-serif`
  },

  colors: {
    primary: "#f6db79",
  },

  components: {
    Menu,
    Button,
    Input,
    Accordion,
    Table: {
      variants: {
        wipTable: {
          thead: { 
            tr: { 
              background: "#0d1117",
            },
            th: {
              fontSize:"17px",
              fontWeight: "light",
              letterSpacing: "1px",
            }
          },
          tbody: { 
            fontFamily: "arial",
            letterSpacing: "1px",
            tr: { 
              _odd: {
                background: "#21262d",
              },

            },
            
          },
          tr: {
            
            
          },
        }
      }
    }
  }
})

export default theme
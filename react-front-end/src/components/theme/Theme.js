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
    lime: {
      50: '#f2ffde',
    },
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
              textAlign:"center",
            },
            th: {
              fontSize:"17px",
              fontWeight: "light",
              letterSpacing: "1px",
              textAlign:"center",
            }
          },
          tbody: { 
            fontFamily: "arial",
            letterSpacing: "1px",
            textAlign:"center",
            tr: { 
              _odd: {
                background: "#21262d",
                textAlign:"center",
              },

            },
            td: {
              textAlign:"center",
            }
            
          },
          tr: {
            textAlign:"center",
            
            
          },
        }
      }
    }
  }
})

export default theme
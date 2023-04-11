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
    
  }
})

export default theme
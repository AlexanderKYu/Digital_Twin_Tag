import { extendTheme } from '@chakra-ui/react'
import { menuTheme } from './MenuTheme'
import { Button } from './ButtonTheme'
import { inputTheme } from './InputTheme'

const theme = extendTheme({
  fonts: {
    heading: `'Antonio',sans-serif`,
    body: `'Antonio', sans-serif`,
  },

  components: {
    Menu: menuTheme,
    Button,
    
  }
})

export default theme
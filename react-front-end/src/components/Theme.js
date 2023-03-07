import { extendTheme } from '@chakra-ui/react'
import { menuTheme } from './MenuTheme'

const theme = extendTheme({
  fonts: {
    heading: `'Antonio',sans-serif`,
    body: `'Antonio', sans-serif`,
  },

  components: {
    Menu: menuTheme,
  }
})

export default theme
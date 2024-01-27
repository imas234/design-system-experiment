import Box from '@mui/material/Box';
import { ThemeContextProvider, defaultTheme } from './theme/ThemeContext';
import { Text } from './components/Typography';

function App() {
  return (
    <ThemeContextProvider value={defaultTheme}>
      <Box>
        <Box>Hello</Box>
      </Box>
      <Text type={'heading'} size={'lg'}>bla</Text>
    </ThemeContextProvider>
  )
}

export default App

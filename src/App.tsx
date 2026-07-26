import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/Home';
import { Box } from '@mui/material';
import styles from './App.module.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className={styles.pageWrapper}>
        <HomePage />
      </Box>
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
    },
    secondary: {
      main: '#db2777',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RegistrationForm />
    </ThemeProvider>
  );
};

export default App;
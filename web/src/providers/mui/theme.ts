
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // Cores principais
    primary: {
      main: '#518432', // cor1
      light: '#388809', // cor mais clara
      dark: '#47941a', // cor2
      contrastText: '#fff',
    },
    secondary: {
      main: '#4BA721', // cor alternativa
      contrastText: '#fff',
    },
    success: {
      main: '#27AC22', // sucesso
      contrastText: '#fff',
    },
    error: {
      main: 'rgb(173, 16, 16)', // erro
      contrastText: '#fff',
    },
    warning: {
      main: '#F0524B', // aviso
      contrastText: '#fff',
    },
    info: {
      main: '#FFC511', // destaque
      contrastText: '#414040',
    },
    // Cores neutras
    text: {
      primary: 'rgb(36, 35, 35)',
      secondary: 'rgb(97, 96, 96)',
      disabled: '#AAAAAA',
    },
    background: {
      default: '#fff',
      paper: '#414040',
    },
    grey: {
      100: '#AAAAAA',
      300: '#919191',
      500: '#646464',
      700: '#525050',
      900: '#3a3a3a',
    },
    divider: '#AAAAAA',
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Open Sans',
      'Mali',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'cursive',
    ].join(','),
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 44,
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 38,
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 35,
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 32,
      fontWeight: 500,
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 25,
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 22,
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Open Sans, Helvetica Neue, sans-serif',
      fontSize: 18,
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Mali, cursive, Helvetica Neue, sans-serif',
      fontSize: 16,
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      fontSize: 15,
      borderRadius: 30,
      textTransform: 'none',
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 5, // padrão para caixas/cards
  },
  spacing: 8, // base para padding/margin
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          fontWeight: 600,
          fontSize: 15,
          backgroundColor: '#518432',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#47941a',
            color: '#fff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
          backgroundColor: '#fff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: 'none',
          fontSize: 18,
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fff',
          color: '#242323',
          fontFamily: 'Open Sans, Helvetica Neue, sans-serif',
        },
        '::selection': {
          backgroundColor: '#47941a',
          color: '#fff',
        },
        '*::-webkit-scrollbar': {
          width: '12px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: '#919191',
          borderRadius: '10px',
          border: '1px solid #fff',
        },
      },
    },
  },
});

export default theme;

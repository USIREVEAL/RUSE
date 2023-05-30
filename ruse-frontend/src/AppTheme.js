import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  spacing: 10,
  palette: {
    background: {
      main: '#1a1a1d',
      secondary: '#4e4e50'
    },
    primary: {
      main: '#e53358',
    },
    secondary: {
      main: '#1a1a1d',
    },
    third: {
      main: '#6f2232'
    },
  },

});

export default theme;
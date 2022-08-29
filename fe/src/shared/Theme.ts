import { createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';

const theme = createTheme({
  palette: {
    primary: blue
  },
  typography: {
    // Tell MUI what the font-size on the html element is.
    htmlFontSize: 20,
  },
});

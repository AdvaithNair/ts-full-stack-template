import { createMuiTheme } from '@material-ui/core/styles';
import {COLORS} from "@app/common";

const Theme = createMuiTheme({
  palette: {
    primary: { 500: COLORS.SECONDARY, }
  },
  typography: {
    fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});

export default Theme;

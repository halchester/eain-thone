const { createMuiTheme } = require("@material-ui/core");

const theme = createMuiTheme({
  typography: {
    fontFamily: "Ubuntu",
  },
  palette: {
    primary: {
      main: "#334443",
    },
    secondary: {
      main: "#34656d",
      light: "#c6ffc1",
    },
  },
});

export default theme;

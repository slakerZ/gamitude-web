import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgba(104, 58,131,1)",
        },
        secondary: {
            main: "rgba(196, 195, 81, 0.8)", // This yellow-goldish one
        },
        info: {
            main: "rgba(30, 129, 146, 0.5)",
        },
    },
});

export default theme;

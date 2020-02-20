import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgba(78, 19, 112, 0.5)", // Smooth Purple
        },
        secondary: {
            main: "rgba(168, 167, 20, 0.5)", // Smooth Gold-ish
        },
        info: {
            main: "rgba(94, 15, 111, 0.5)", // Radiant Purple
        },
        success: {
            main: "rgba(149, 165, 19, 0.5)", // Dim Gold-ish
        },
        error: {
            main: "#444444",
        },
        warning: {
            main: "#444444",
        },
    },
});

export default theme;

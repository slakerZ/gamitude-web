import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    props: {
        MuiSvgIcon: {
            htmlColor: "#F5F5F5",
        },
    },
    palette: {
        primary: {
            light: "rgba( 28, 60,135,1)",
            main: "rgba( 18, 39, 86,1)",
            dark: "rgba(  2,  4, 11,1)",
        },
        secondary: {
            light: "rgba( 77, 66,  9,1)",
            main: "rgba(129,109, 15,1)",
            dark: "rgba( 16, 14,  1,1)",
        },
        // error: {},
        // warning: {},
        // info: {},
        // success: {},
        action: {
            selected: "rgba( 28, 60,135,1)",
            hover: "rgba( 28, 60,135,1)",
            disabled: "rgba( 77, 66,  9,1)",
        },
    },
    typography: {
        allVariants: {
            color: "#F5F5F5",
        },
        fontFamily: [
            "Roboto",
            "-apple - system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Oxygen",
            "Ubuntu",
            "Cantarell",
            "Fira Sans",
            "Droid Sans",
            "Helvetica Neue",
            "sans - serif",
            "Atomic Age",
        ].join(","),
    },
    overrides: {
        MuiMenuItem: {
            root: {
                backgroundColor: "rgba( 18, 39, 86,1)",
            },
        },
        MuiOutlinedInput: {
            root: {
                color: "rgba(255,255,255,1)",
                borderRight: "1px solid white",
                borderBottom: "1px solid white",
            },
        },
        MuiInputLabel: {
            root: {
                color: "rgba(255,255,255,1)",
                "&.Mui-focused": {
                    color: "rgba(255,255,255,1)",
                    backgroundColor: "rgba( 18, 39, 86,1)",
                },
            },
        },
        MuiList: {
            root: {
                backgroundColor: "rgba( 18, 39, 86,1)",
            },
        },
    },
});

export default theme;

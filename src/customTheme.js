import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            lighter: "rgba(125, 108, 135, 0.5)",
            light: "rgba(104, 58, 131, 0.5)",
            main: "rgba(78, 19, 112, 0.5)",
            dark: "rgba(58, 3, 91, 0.5)",
            darker: "rgba(38, 0, 60, 0.5)",
        },
        secondary: {
            lighter: "rgba(128, 105, 133, 0.5)",
            light: "rgba(116, 55, 129, 0.5)",
            main: "rgba(94, 15, 111, 0.5)",
            dark: "rgba(74, 2, 89, 0.5)",
            darker: "rgba(49, 0, 59, 0.5)",
        },
        tertriary: {
            lighter: "rgba(193, 197, 155, 0.5)",
            light: "rgba(180, 192, 79, 0.5)",
            main: "rgba(149, 165, 19, 0.5)",
            dark: "rgba(119, 133, 0, 0.5)",
            darker: "rgba(78, 87, 0, 0.5)",
        },
        complement: {
            lighter: "rgba(202, 201, 159, 0.5)",
            light: "rgba(196, 195, 81, 0.5)",
            main: "rgba(168, 167, 20, 0.5)",
            dark: "rgba(136, 135, 0, 0.5)",
            darker: "rgba(89, 89, 0, 0.5)",
        },
        stats: {
            strength: "rgba(153, 38, 20, .5)",
            creativity: "rgba(35, 168, 44, .5)",
            intelligence: "rgba(65, 139, 224, .5)",
            fluency: "rgba(93, 38, 115, .5)",
        },
        tiers: {
            s: "rgba(61, 124, 145, .5)",
            a: "rgba(70, 138, 58, .5)",
            b: "rgba(121, 189, 109, .5)",
            c: "rgba(235, 231, 5, .5)",
            d: "rgba(191, 145, 46, .5)",
            f: "rgba(145, 38, 38, .5)",
        },
    },
    typography: {
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
});

export default theme;

import { makeStyles } from "@material-ui/core";

const useCustomIconStyles = makeStyles((theme) => ({
    error: {
        backgroundColor: theme.palette.error.contrastText,
    },
    small: {
        width: "4vh",
        height: "4vh",
    },
    medium: {
        width: "5vh",
        height: "5vh",
    },
    large: {
        width: "6vh",
        height: "6vh",
    },
    bar: {
        width: "60px",
        height: "60px",
        float: "left",
        padding: "7px",
        "&::after": {
            clear: "both",
        },
    },
    avatar: {
        width: "20vh",
        height: "20vh",
    },
    white: {
        fill: "white",
    },
}));

export default useCustomIconStyles;

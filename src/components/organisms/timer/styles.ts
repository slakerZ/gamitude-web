import { makeStyles } from "@material-ui/core/styles";

const useTimerStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    timerDisplay: {
        width: "20vh",
        height: "20vh",
        border: `7px ${theme.palette.primary.light} outset`,
        borderRadius: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    addFive: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1.5),
        border: `2px ${theme.palette.primary.light} outset`,
        borderRadius: "100%",
    },
    methods: {
        margin: theme.spacing(2),
    },
    method: {},
    minSecWrapper: {},
    methodButton: {},
}));

export default useTimerStyles;

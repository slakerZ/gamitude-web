import { makeStyles } from "@material-ui/core/styles";

const useProjectStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
    },

    summary: {
        backgroundColor: theme.palette.primary.light,
    },
    details: {
        backgroundColor: theme.palette.primary.main,
        flexDirection: "column",
    },
    btnGroup: {
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "space-around",
    },
    btn: {
        "&.Mui-selected": {
            background: theme.palette.primary.dark,
            "&:hover": {
                background: theme.palette.primary.light,
            },
        },
    },
    expansionPanelDetails: {
        backgroundColor: theme.palette.secondary.main,
        flexDirection: "column",
    },
}));

export default useProjectStyles;

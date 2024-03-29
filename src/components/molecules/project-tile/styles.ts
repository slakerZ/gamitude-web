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
        backgroundColor: theme.palette.primary.dark,
    },
    details: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.primary.main,
        "& > *": {
            margin: theme.spacing(1, 0),
        },
    },
    expansionPanelDetails: {
        backgroundColor: theme.palette.secondary.main,
        flexDirection: "column",
    },
    selectProject: {
        "& .MuiFormControlLabel-label": {
            fontSize: "2rem",
        },
    },
    hide: {
        display: "none",
    },
}));

export default useProjectStyles;

import { makeStyles } from "@material-ui/core/styles";

const useProjectTaskStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    task: {
        backgroundColor: theme.palette.primary.dark,
    },
    details: {
        display: "flex",
        flexDirection: "column",
        "& > *": {
            margin: theme.spacing(1, 0),
        },
    },
    finish: {
        position: "absolute",
        right: "50px",
    },
}));

export default useProjectTaskStyles;

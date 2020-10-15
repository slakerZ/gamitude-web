import { makeStyles, Theme } from "@material-ui/core/styles";

const useFormikFormStyles = makeStyles((theme: Theme) => ({
    formWrapper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontWeight: "bolder",
        textAlign: "center",
        margin: theme.spacing(3, 3),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        margin: theme.spacing(0, 10),
        display: "flex",
        flexDirection: "column",
    },
    submit: {
        margin: theme.spacing(2, 0),
    },
    link: {
        margin: theme.spacing(1, 1),
        cursor: "pointer",
    },
}));

export default useFormikFormStyles;
import { makeStyles, Theme } from "@material-ui/core/styles";

const useFormikFormStyles = makeStyles((theme: Theme) => ({
    header: {
        fontWeight: "bolder",
        textAlign: "center",
        margin: theme.spacing(3, 3),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        display: "flex",
        flexDirection: "column",
    },
    submit: {
        margin: theme.spacing(2, 0),
        alignSelf: "center",
    },
}));

export default useFormikFormStyles;

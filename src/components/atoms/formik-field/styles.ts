import { makeStyles } from "@material-ui/core/styles";

const useFormikFieldStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1.5, 0),
    },
    error: {
        position: "fixed",
        color: "red",
    },
    endAdornment: {
        cursor: "pointer",
    },
}));

export default useFormikFieldStyles;

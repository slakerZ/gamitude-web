import { makeStyles } from "@material-ui/core/styles";

const useSessionManagerStyles = makeStyles((theme) => {
    return {
        root: {
            padding: theme.spacing(2),
            userSelect: "none",
        },
        switchGrid: {
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
    };
});

export default useSessionManagerStyles;

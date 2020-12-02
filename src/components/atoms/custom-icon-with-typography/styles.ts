import { makeStyles } from "@material-ui/core/styles";

const useCustomIconWithTypographyStyles = makeStyles((theme) => {
    return {
        root: {
            padding: theme.spacing(0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            "& > *": {
                margin: theme.spacing(0, 0.4),
            },
        },
    };
});

export default useCustomIconWithTypographyStyles;

import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const SignInUpHeader = ({ text }: { text: string }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            fontWeight: "bolder",
            textAlign: "center",
            margin: theme.spacing(3, 3),
        },
    }));
    const classes = useStyles();

    return (
        <Typography className={classes.root} component="h1" variant="h1">
            {text}
        </Typography>
    );
};

export default SignInUpHeader;

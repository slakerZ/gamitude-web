import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const SignInUpSubmit = ({ text, isValid, dirty, loading }) => {
    const useStyles = makeStyles(theme => ({
        submit: {
            margin: theme.spacing(2, 0),
        },
    }));
    const classes = useStyles();

    return (
        <Button
            disabled={!isValid || !dirty || loading}
            type="submit"
            variant="outlined"
            className={classes.submit}
        >
            {text}
        </Button>
    );
};
export default SignInUpSubmit;

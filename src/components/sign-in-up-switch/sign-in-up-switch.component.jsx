import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// Context
import { SignInUpContext } from "../../pages/signInSignUp/sign-in-sign-up.context";

const SignInUpSwitch = ({ toSignIn }) => {
    const text = toSignIn
        ? "Already have an account?"
        : "Don't have and account?";

    const useStyles = makeStyles(theme => ({
        link: {
            margin: theme.spacing(1, 1),
            cursor: "pointer",
        },
    }));
    const classes = useStyles();

    return (
        <SignInUpContext.Consumer>
            {context => (
                <Typography
                    className={classes.link}
                    variant="h6"
                    component={Link}
                    onClick={event => {
                        event.preventDefault();
                        context.updateChecked(toSignIn);
                    }}
                >
                    {text}
                </Typography>
            )}
        </SignInUpContext.Consumer>
    );
};

export default SignInUpSwitch;

import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
// Context
import { useSignInUp } from "../../../context/sign-in-sign-up.context";

const SignInUpSwitch = ({ toSignIn }: { toSignIn: boolean }) => {
    const text = toSignIn
        ? "Already have an account?"
        : "Don't have an account?";

    const useStyles = makeStyles((theme) => ({
        link: {
            margin: theme.spacing(1, 1),
            cursor: "pointer",
        },
    }));
    const classes = useStyles();
    const { checked, setChecked } = useSignInUp()!;

    return (
        <Typography
            className={classes.link}
            variant="h6"
            component={Link}
            onClick={(event: any) => {
                event.preventDefault();
                setChecked(toSignIn);
            }}
        >
            {text}
        </Typography>
    );
};

export default SignInUpSwitch;

import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import clsx from "clsx";
// Components
import SignUpForm from "../../organisms/sign-up-form/sign-up-form.component";
import SignInForm from "../../organisms/sign-in-form/sign-in-form.component";
import { useSignInUp } from "../../../context/sign-in-sign-up.context";

const SignUp = () => {
    const { isSignUp: isSignUp } = useSignInUp()!;

    const url = isSignUp
        ? "https://images.unsplash.com/photo-1562186348-28ba89540752?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        : "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80";

    const timeout = 1000;

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            height: "100%",
        },
        signUp: {
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "40% 60%",
        },
        signIn: {
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "60% 40%",
        },
        image: {
            backgroundColor: theme.palette.primary.main,
            backgroundImage: `url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        },
        none: {
            display: "none",
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Fade in={isSignUp} timeout={timeout}>
                <div
                    className={clsx(classes.signIn, {
                        [classes.none]: !isSignUp,
                    })}
                >
                    <div className={classes.image} />
                    <SignInForm />
                </div>
            </Fade>

            <Fade in={!isSignUp} timeout={timeout}>
                <div
                    className={clsx(classes.signUp, {
                        [classes.none]: isSignUp,
                    })}
                >
                    <SignUpForm />
                    <div className={classes.image} />
                </div>
            </Fade>
        </div>
    );
};

export default SignUp;

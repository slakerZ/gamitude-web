import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
// Components
import SignInForm from "../../organisms/sign-in-form/sign-in-form.component";
import SignInUpImage from "../../atoms/sign-in-up-image/sign-in-up-image.component";
import { useSignInUp } from "../../../context/sign-in-sign-up.context";

const SignIn = () => {
    const useStyles = makeStyles({
        root: {
            position: "fixed",
            width: "100vw",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "60vw 40vw",
        },
    });
    const classes = useStyles();
    const { checked, setChecked } = useSignInUp()!;

    return (
        <Fade in={checked}>
            <div className={classes.root}>
                <SignInUpImage signIn={true} />
                <SignInForm />
            </div>
        </Fade>
    );
};

export default SignIn;

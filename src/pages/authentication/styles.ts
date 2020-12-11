import { makeStyles } from "@material-ui/core/styles";

import { SIGN_UP_IMAGE_URL, SIGN_IN_IMAGE_URL } from "./constants";

const SignInSignUpStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
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
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    signUpImage: {
        backgroundImage: `url(${SIGN_UP_IMAGE_URL})`,
    },
    signInImage: {
        backgroundImage: `url(${SIGN_IN_IMAGE_URL})`,
    },
    none: {
        display: "none",
    },
    formWrapper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    link: {
        margin: theme.spacing(1, 1),
        cursor: "pointer",
        color: theme.palette.primary.contrastText,
    },
}));

export default SignInSignUpStyles;

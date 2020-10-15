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
    header: {
        fontWeight: "bolder",
        textAlign: "center",
        margin: theme.spacing(3, 3),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        margin: theme.spacing(0, 10),
        display: "flex",
        flexDirection: "column",
    },
    submit: {
        margin: theme.spacing(2, 0),
    },
    link: {
        margin: theme.spacing(1, 1),
        cursor: "pointer",
    },
}));

export default SignInSignUpStyles;

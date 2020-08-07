import React from "react";
// UI Core
import { makeStyles } from "@material-ui/core/styles";

const SignInUpImage = ({ signIn }: { signIn: any }) => {
    const url = signIn
        ? "https://images.unsplash.com/photo-1562186348-28ba89540752?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        : "https://images.unsplash.com/photo-1428973085873-61a784626aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1355&q=80";

    const useStyles = makeStyles((theme) => ({
        image: {
            backgroundColor: theme.palette.primary.main,
            backgroundImage: `url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
        },
    }));
    const classes = useStyles();

    return <div className={classes.image} />;
};
export default SignInUpImage;

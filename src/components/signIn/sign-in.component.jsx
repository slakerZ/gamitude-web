import React from "react";
import { connect } from "react-redux";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const SignInComponent = () => {
    const useStyles = makeStyles({
        signIn: {
            backgroundColor: "rgba(180, 192, 79, 0.5)",
            boxShadow: "5px 5px 10px #000000",
            padding: "2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignContent: "space-around",
            height: "50%",
            margin: "2%",
        },
    });
    const classes = useStyles();

    return (
        <div className={classes.signIn}>
            <Typography variant="h2" component="h2">
                Already a member?
            </Typography>

            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input type="email" />
            </FormControl>

            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input type="password" />
            </FormControl>

            <Button variant="contained" color="primary" size="large">
                Submit
            </Button>
            <Button variant="contained" color="primary" size="large">
                Log In with Google
            </Button>
        </div>
    );
};

export const SignIn = connect()(SignInComponent);

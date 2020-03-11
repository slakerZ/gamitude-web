import React, { useState } from "react";
import { connect } from "react-redux";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const SignUpComponent = () => {
    const useStyles = makeStyles({
        signUp: {
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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={classes.signUp}>
            <Typography variant="h2" component="h2">
                Don&apos;t have an account?
            </Typography>

            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </FormControl>

            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </FormControl>

            <FormControl>
                <InputLabel>Confirm Password</InputLabel>
                <Input type="password" />
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={event => console.log(email, password)}
            >
                Submit
            </Button>
        </div>
    );
};

export const SignUp = connect()(SignUpComponent);

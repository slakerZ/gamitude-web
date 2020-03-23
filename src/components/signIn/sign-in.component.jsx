import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
// Actions
import { setUser } from "../../redux/user/user.actions";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const SignInComponent = ({ setUser }) => {
    const useStyles = makeStyles({
        signIn: {
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

    const handleSubmission = async event => {
        // Uncomment when handled local db and stuff
        // const url =
        //     process.env.NODE_ENV !== "development"
        //         ? "http://localhost:5020/api/auth/Authorization/Login"
        //         : "http://gamitude.rocks:31777/api/auth/Authorization/Login";
        const url = "http://gamitude.rocks:31777/api/auth/Authorization/Login";
        axios
            .post(url, {
                Email: email,
                Password: password,
            })
            .then(function(response) {
                setUser(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    return (
        <div className={classes.signIn}>
            <Typography variant="h2" component="h2">
                Already a member?
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

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmission}
            >
                Submit
            </Button>
            <Button variant="contained" color="primary" size="large">
                Log In with Google
            </Button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user)),
});

export const SignIn = connect(null, mapDispatchToProps)(SignInComponent);

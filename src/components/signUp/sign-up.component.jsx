import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { register } from "../../firebase/ducks/actions";

const SignUpComponent = ({ register }) => {
    const useStyles = makeStyles({
        signUp: {
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

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = prop => event => {
        setFormData({ ...formData, [prop]: event.target.value });
    };

    const registerEmailPassword = (email, password) => {
        return register({ email, password });
    };

    return (
        <div className={classes.signUp}>
            <Typography variant="h2" component="h2">
                Don&apos;t have an account?
            </Typography>

            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                />
            </FormControl>

            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input
                    type="password"
                    value={formData.password}
                    onChange={handleChange("password")}
                />
            </FormControl>

            <FormControl>
                <InputLabel>Confirm Password</InputLabel>
                <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                />
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() =>
                    registerEmailPassword(formData.email, formData.password)
                }
            >
                Submit
            </Button>
        </div>
    );
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => {
    return {
        register: ({ email, password, provider }) =>
            dispatch(register({ email, password, provider })),
    };
};

export const SignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpComponent);

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// UI Core
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// Actions
import { setUser } from "../../redux/user/user.actions";

const ProfilePage = ({ setUser }: { setUser: any }) => {
    const useStyles = makeStyles({
        root: {
            padding: "50px",
        },
    });
    const classes = useStyles();

    const logout = () => {
        setUser({
            token: null,
        });
    };

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to={"/signInSignUp"}
                onClick={logout}
            >
                {"Logout"}
            </Button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setUser: (value) => dispatch(setUser(value)),
});

export default connect(null, mapDispatchToProps)(ProfilePage);

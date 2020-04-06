import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useAsyncFn } from "react-use";
// Actions
import { addProject } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
// UI icons
import AddIcon from "@material-ui/icons/Add";
import CachedIcon from "@material-ui/icons/Cached";
// UI core
import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProjectAdd = ({ addProject, token }) => {
    const useStyles = makeStyles(theme => ({
        add: {
            position: "sticky",
            margin: "0 20px 40px 0",
            float: "right",
            top: "calc(100vh - 50px)",
            boxShadow: "5px 5px 10px #000000",
            backgroundColor: theme.palette.complement.dark,
        },
    }));
    const classes = useStyles();

    const url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:5010/api/pro/Projects"
            : "http://gamitude.rocks:31778/api/pro/Projects";
    const [state, submit] = useAsyncFn(async () => {
        const headers = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        };
        const request_data = {
            Name: "New Project",
            PrimaryMethod: "POMODORO",
            ProjectStatus: "ACTIVE",
            Stats: ["INTELLIGENCE"],
            DominantStat: "INTELLIGENCE",
        };
        const response = await axios.post(url, request_data, headers);
        const data = await response.data;
        addProject(response.data.id);
        return data;
    }, [url]);

    return (
        <Fab
            color="secondary"
            aria-label="add"
            className={classes.add}
            onClick={submit}
            disabled={state.loading}
        >
            {state.loading ? (
                <CircularProgress />
            ) : state.error ? (
                <CachedIcon />
            ) : (
                <AddIcon />
            )}
        </Fab>
    );
};

const mapStateToProps = state => ({
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    addProject: value => dispatch(addProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);

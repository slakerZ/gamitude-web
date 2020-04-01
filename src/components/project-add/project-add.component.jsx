import React from "react";
import { connect } from "react-redux";
import axios from "axios";
// Actions
import { addProject } from "../../redux/projects/projects.actions";
// Selectors
import { selectToken } from "../../redux/user/user.selectors";
// UI icons
import AddIcon from "@material-ui/icons/Add";
// UI core
import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";

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

    const handleAdd = () => {
        // TODO makes to to pop some modal and don't just post defaults
        // Fields names vary, arguments also vary need translation method
        addProject();
        const url = "http://gamitude.rocks:31778/api/pro/Projects";
        const data = {
            Name: "New Project",
            PrimaryMethod: "POMODORO",
            ProjectStatus: "ACTIVE",
            Stats: ["INTELLIGENCE"],
            DominantStat: "INTELLIGENCE",
        };
        const headers = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        };
        axios.post(url, data, headers).then(response => {
            console.log(response.data);
        });
    };

    return (
        <Fab
            color="secondary"
            aria-label="add"
            className={classes.add}
            onClick={handleAdd}
        >
            <AddIcon />
        </Fab>
    );
};

const mapStateToProps = state => ({
    token: selectToken(state),
});

const mapDispatchToProps = dispatch => ({
    addProject: () => dispatch(addProject()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);

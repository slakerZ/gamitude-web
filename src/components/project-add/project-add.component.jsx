import React from "react";
import { connect } from "react-redux";
// Actions
import { addProject } from "../../redux/projects/projects.actions";
// UI icons
import AddIcon from "@material-ui/icons/Add";
// UI core
import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";

const ProjectAdd = ({ addProject }) => {
    // TODO button won't be in the right place after projects go into scrollable
    const useStyles = makeStyles({
        add: {
            position: "absolute",
            right: "1vh",
            bottom: "1vh",
            boxShadow: "5px 5px 10px #000000",
            backgroundColor: "rgba(196, 195, 81, 0.8)",
        },
    });
    const classes = useStyles();

    return (
        <Fab
            color="secondary"
            aria-label="add"
            className={classes.add}
            onClick={addProject}
        >
            <AddIcon />
        </Fab>
    );
};

const mapDispatchToProps = dispatch => ({
    addProject: () => dispatch(addProject()),
});

export default connect(null, mapDispatchToProps)(ProjectAdd);

import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
// Components
import ProjectAddForm from "../../organisms/project-add-form/projects-add-form.component";

const ProjectAdd = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            position: "sticky",
            margin: "0 20px 40px 0",
            float: "right",
            top: "calc(100vh - 50px)",
        },
        add: {
            boxShadow: "5px 5px 10px #000000",
            backgroundColor: theme.palette.complement.dark,
        },
    }));
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <Tooltip title="Add Project">
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.add}
                    onClick={handleClickOpen}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <ProjectAddForm open={open} setOpen={setOpen} />
        </div>
    );
};

export default ProjectAdd;

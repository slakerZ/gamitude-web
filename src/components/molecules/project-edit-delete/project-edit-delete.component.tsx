import React from "react";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import ProjectEditDeleteAlert from "../project-edit-delete-alert/project-edit-delete-alert.component";

const ProjectEditDelete = ({ index, setIsExpanded }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            justifyContent: "center",
            margin: theme.spacing(1, 0),
        },
    }));
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleDeletion = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <ProjectEditDeleteAlert
                index={index}
                setIsExpanded={setIsExpanded}
                open={open}
                setOpen={setOpen}
            />

            <Button onClick={handleDeletion} variant="contained">
                <Typography component="h6" variant="h6">
                    {"Delete Project"}
                </Typography>
            </Button>
        </div>
    );
};

export default ProjectEditDelete;

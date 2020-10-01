import React from "react";
// Redux
import { connect } from "react-redux";
import { selectProjects } from "../../../redux/projects/projects.selectors";
// UI Core
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
// UI icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//Components
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import ProjectEdit from "../../molecules/project-edit/project-edit.component";
// Local
import { ProjectType } from "./types";

const Project = ({ index, projects }: ProjectType) => {
    const useStyles = makeStyles((theme) => ({
        container: {
            backgroundColor: "transparent",
        },
        summary: {
            backgroundColor: theme.palette.primary.light,
        },
        details: {
            backgroundColor: theme.palette.primary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    const dominant = projects[index].dominant;
    const name = projects[index].name;

    return (
        <Accordion square className={classes.container}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={classes.summary}
            >
                <CustomIcon variant={dominant} size="medium" />
                <Typography component="h3" variant="h3">
                    {name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <ProjectEdit index={index} />
            </AccordionDetails>
        </Accordion>
    );
};

const mapStateToProps = (state: any) => ({
    projects: selectProjects(state),
});

export default connect(mapStateToProps)(Project);

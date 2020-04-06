import React, { useEffect } from "react";
import { connect } from "react-redux";
// Selectors
import { selectSessionInProgress } from "../../redux/session/session.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// Components
import ProjectStats from "../project-stats/project-stats.component.jsx";
import ProjectsStatsDominant from "../project-stats-dominant/project-stats-dominant.component.jsx";
import ProjectStatus from "../project-status/project-status.component.jsx";
import ProjectEditDelete from "../project-edit-delete/project-edit-delete.component.jsx";
import ProjectEditHeader from "../project-edit-header/project-edit-header.component.jsx";
import ProjectEditName from "../project-edit-name/project-edit-name.component.jsx";
import ProjectEditSubmit from "../project-edit-submit/project-edit-submit.component.jsx";

const ProjectEdit = ({ index, sessionInProgress }) => {
    const useStyles = makeStyles(theme => ({
        expansionPanel: {
            backgroundColor: "transparent",
        },
        expansionPanelDetails: {
            backgroundColor: theme.palette.secondary.main,
            flexDirection: "column",
        },
    }));
    const classes = useStyles();

    const [isExpanded, setIsExpanded] = React.useState(false);

    useEffect(() => {
        setIsExpanded(false);
    }, [sessionInProgress]);

    return (
        <ExpansionPanel
            square
            className={classes.expansionPanel}
            disabled={sessionInProgress}
            expanded={isExpanded}
            onChange={(e, expanded) => setIsExpanded(expanded)}
        >
            <ProjectEditHeader />

            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                <ProjectEditName index={index} />
                <ProjectStats index={index} />
                <ProjectsStatsDominant index={index} />

                <ProjectStatus index={index} destination={1} />
                <ProjectStatus index={index} destination={2} />

                <ProjectEditDelete
                    index={index}
                    setIsExpanded={setIsExpanded}
                />

                <ProjectEditSubmit
                    index={index}
                    setIsExpanded={setIsExpanded}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const mapStateToProps = state => ({
    sessionInProgress: selectSessionInProgress(state),
});

export default connect(mapStateToProps)(ProjectEdit);

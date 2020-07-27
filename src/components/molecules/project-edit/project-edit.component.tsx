import React, { useEffect } from "react";
import { connect } from "react-redux";
// Selectors
import { selectSessionInProgress } from "../../../redux/session/session.selectors";
// UI core
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// Components
import ProjectEditHeader from "../../atoms/project-edit-header/project-edit-header.component";
import ProjectEditBody from "../project-edit-body/project-edit-body.component";

const ProjectEdit = ({ index, sessionInProgress }) => {
    const useStyles = makeStyles((theme) => ({
        expansionPanel: {
            backgroundColor: "transparent",
            margin: theme.spacing(1, 0),
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
            <ProjectEditBody index={index} setIsExpanded={setIsExpanded} />
        </ExpansionPanel>
    );
};

const mapStateToProps = (state) => ({
    sessionInProgress: selectSessionInProgress(state),
});

export default connect(mapStateToProps)(ProjectEdit);

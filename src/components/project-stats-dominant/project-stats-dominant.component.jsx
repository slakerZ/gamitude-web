import React from "react";
import { connect } from "react-redux";
// Actions
import { setDominant } from "../../redux/projects/projects.actions";
// Selectors
import { selectProjects } from "../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// UI lab
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

const ProjectStatsDominant = ({ index, projects, setDominant }) => {
    const boosted = projects[index].boosted;
    const dominant = projects[index].dominant;

    const handleChange = (event, newDominant) => {
        if (boosted.includes(newDominant)) {
            setDominant({ index, newDominant });
        }
    };

    const useStyles = makeStyles({
        container: {
            display: "flex",
            flexDirection: "column",
        },
        btnGroup: {
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-around",
        },
        icon: {
            width: "4vh",
            height: "4vh",
        },
    });
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant="h5" component="h5" align="center">
                Select the dominant stat
            </Typography>
            <ToggleButtonGroup
                value={dominant}
                exclusive
                onChange={handleChange}
                aria-label="dominant stat"
                className={classes.btnGroup}
            >
                <ToggleButton value="strength" aria-label="strength">
                    <Strength className={classes.icon} />
                </ToggleButton>

                <ToggleButton value="creativity" aria-label="creativity">
                    <Creativity className={classes.icon} />
                </ToggleButton>

                <ToggleButton value="intelligence" aria-label="intelligence">
                    <Intelligence className={classes.icon} />
                </ToggleButton>

                <ToggleButton value="fluency" aria-label="fluency">
                    <Fluency className={classes.icon} />
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

const mapStateToProps = state => ({
    projects: selectProjects(state),
});

const mapDispatchToProps = dispatch => ({
    setDominant: value => dispatch(setDominant(value)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectStatsDominant);

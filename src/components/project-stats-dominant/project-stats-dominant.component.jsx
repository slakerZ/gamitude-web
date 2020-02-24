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
// Components
import CustomIcon from "../custom-icon/custom-icon.component.jsx";

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
            marginBottom: "1rem",
        },
        btnGroup: {
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-around",
        },
        btn: {
            "&.Mui-selected": {
                background: "#CAC99F",
                "&:hover": {
                    background: "#C1C59B",
                },
            },
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
                <ToggleButton
                    value="strength"
                    aria-label="strength"
                    className={classes.btn}
                >
                    <CustomIcon variant="Strength" size="medium" />
                </ToggleButton>

                <ToggleButton
                    value="creativity"
                    aria-label="creativity"
                    className={classes.btn}
                >
                    <CustomIcon variant="Creativity" size="medium" />
                </ToggleButton>

                <ToggleButton
                    value="intelligence"
                    aria-label="intelligence"
                    className={classes.btn}
                >
                    <CustomIcon variant="Intelligence" size="medium" />
                </ToggleButton>

                <ToggleButton
                    value="fluency"
                    aria-label="fluency"
                    className={classes.btn}
                >
                    <CustomIcon variant="Fluency" size="medium" />
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

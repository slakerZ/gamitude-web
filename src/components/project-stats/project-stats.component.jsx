import React from "react";
import { connect } from "react-redux";
// Actions
import { setBoosted } from "../../redux/projects/projects.actions";
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

const ProjectStats = ({ index, projects, setBoosted }) => {
    const boosted = projects[index].boosted;
    const dominant = projects[index].dominant;

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

    const handleChange = (event, newBoosted) => {
        if (newBoosted.length > 0 && newBoosted.includes(dominant)) {
            setBoosted({ index, newBoosted });
        }
    };

    return (
        <div className={classes.container}>
            <Typography component="h5" variant="h5" align="center">
                Select stats that this projects boosts
            </Typography>
            <ToggleButtonGroup
                value={boosted}
                onChange={handleChange}
                aria-label="boosted stats"
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
    setBoosted: value => dispatch(setBoosted(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStats);

import React from "react";
import { connect } from "react-redux";
// Actions
import { setBoosted } from "../../redux/projects/projects.actions";
// Selectors
import { selectProjects } from "../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// UI lab
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
// UI icons
import SaveIcon from "@material-ui/icons/Save";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

const ProjectStats = ({ index, projects, setBoosted }) => {
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

    const project = projects[index];
    const [stats, setStats] = React.useState(project.boosted);

    const handleChange = (event, newStats) => {
        console.log(newStats);
        if (newStats.length > 0) {
            setStats(newStats || stats);
        }
    };

    const handleSave = () => {
        setBoosted(stats, index);
    };

    return (
        <div className={classes.container}>
            <Typography component="h5" variant="h5" align="center">
                Select stats that this projects boosts
            </Typography>
            <ToggleButtonGroup
                value={stats}
                onChange={handleChange}
                aria-label="boosted stats"
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

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSave}
            >
                Save
            </Button>
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

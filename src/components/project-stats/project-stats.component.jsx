import React from "react";
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

const ProjectStats = () => {
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

    const [stats, setStats] = React.useState(["strength"]);

    const handleChange = (event, newStats) => {
        console.log(newStats);
        setStats(newStats || stats);
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
        </div>
    );
};

export default ProjectStats;

import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// Components
import ProjectStatsCheck from "../project-stats-check/project-stats-check.component.jsx";
// SVG's
import { ReactComponent as Strength } from "../../assets/icons/stats/strength.svg";
import { ReactComponent as Creativity } from "../../assets/icons/stats/creativity.svg";
import { ReactComponent as Intelligence } from "../../assets/icons/stats/intelligence.svg";
import { ReactComponent as Fluency } from "../../assets/icons/stats/fluency.svg";

const ProjectStats = () => {
    const useStyles = makeStyles({
        projectStats: {
            display: "flex",
            justifyContent: "center",
        },
        checksContainer: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
        },
    });
    const classes = useStyles();
    return (
        <div className={classes.projectStats}>
            <Typography component="h5" variant="h5">
                Select stats that this projects boosts
                <div className={classes.checksContainer}>
                    <ProjectStatsCheck Icon={Strength} statName="strength" />
                    <ProjectStatsCheck
                        Icon={Creativity}
                        statName="creativity"
                    />
                    <ProjectStatsCheck
                        Icon={Intelligence}
                        statName="intelligence"
                    />
                    <ProjectStatsCheck Icon={Fluency} statName="fluency" />
                </div>
            </Typography>
        </div>
    );
};

export default ProjectStats;

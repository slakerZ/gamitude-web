import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
// UI icons
import CheckIcon from "@material-ui/icons/Check";

const ProjectStatsCheck = ({ Icon, statName }) => {
    const [selected, setSelected] = React.useState(false);

    const useStyles = makeStyles({
        statCheck: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            width: "4vh",
            height: "4vh",
        },
    });
    const classes = useStyles();

    const handleChange = () => {
        setSelected(!selected);
    };

    return (
        <div className={classes.statCheck}>
            <Icon className={classes.icon} />
            <ToggleButton
                value={`${statName}-${selected}`}
                selected={selected}
                onChange={handleChange}
            >
                <CheckIcon />
            </ToggleButton>
        </div>
    );
};

export default ProjectStatsCheck;

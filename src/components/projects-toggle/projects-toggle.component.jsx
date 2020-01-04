import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles(theme => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

export default function ToggleButtons() {
    const [methodology, setMethodology] = React.useState(25);

    const handleMethodology = (event, newMethodology) => {
        setMethodology(newMethodology || methodology);
    };

    const classes = useStyles();

    return (
        <div className={classes.toggleContainer}>
            <ToggleButtonGroup
                value={methodology}
                exclusive
                onChange={handleMethodology}
                aria-label="text alignment"
            >
                <ToggleButton value={25} aria-label="Pomodoro">
                    <Typography component="h4" variant="h4">
                        25
                    </Typography>
                </ToggleButton>
                <ToggleButton value={90} aria-label="90/30">
                    <Typography component="h4" variant="h4">
                        90
                    </Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}

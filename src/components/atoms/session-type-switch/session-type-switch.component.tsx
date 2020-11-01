import React, { ReactElement, Fragment } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Local
import useSessionManagerStyles from "./styles";
import { SessionManagerPropType } from "./types";

const SessionTypeSwitch = ({
    setSessionType,
    sessionType,
}: SessionManagerPropType): ReactElement => {
    const classes = useSessionManagerStyles();

    const handleChangeSessionType = () => {
        sessionType === "STAT"
            ? setSessionType("ENERGY")
            : setSessionType("STAT");
    };

    return (
        <Fragment>
            <div className={classes.root}>
                <Grid
                    component="label"
                    container
                    className={classes.switchGrid}
                >
                    <Grid item>
                        <Typography variant="body1">{"ENERGIES"}</Typography>
                    </Grid>
                    <Grid item>
                        <Switch
                            checked={sessionType === "STAT"}
                            onChange={handleChangeSessionType}
                            name="energiesStats"
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">{"STATS"}</Typography>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    );
};

export default SessionTypeSwitch;

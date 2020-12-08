import { ProjectSessionTypes } from "gamitude_constants";

import React, { ReactElement, Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

import useSessionManagerStyles from "./styles";
import { SessionManagerPropType } from "./types";

const SessionTypeSwitch = ({
    setSessionType,
    sessionType,
    setBoosted,
    setDominant,
}: SessionManagerPropType): ReactElement => {
    const classes = useSessionManagerStyles();

    const handleChangeSessionType = () => {
        sessionType === ProjectSessionTypes.STAT
            ? setSessionType(ProjectSessionTypes.ENERGY)
            : setSessionType(ProjectSessionTypes.STAT);
        if (setBoosted && setDominant) {
            setBoosted([]);
            setDominant("");
        }
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

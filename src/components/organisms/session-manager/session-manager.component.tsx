import React, { FC, ReactElement, Fragment, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
// Local
import useSessionManagerStyles from "./styles";

const SessionManager: FC = (): ReactElement => {
    const classes = useSessionManagerStyles();
    const [checked, setChecked] = useState(true);

    return (
        <Fragment>
            <div className={classes.root}>
                <Grid
                    component="label"
                    container
                    className={classes.switchGrid}
                >
                    <Grid item>{"ENERGIES"}</Grid>
                    <Grid item>
                        <Switch
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            name="energiesStats"
                        />
                    </Grid>
                    <Grid item>{"STATS"}</Grid>
                </Grid>
            </div>
        </Fragment>
    );
};

export default SessionManager;

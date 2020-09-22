import React, { FC, ReactElement, Fragment, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
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
                    <Grid item>
                        <Typography variant="body1">{"ENERGIES"}</Typography>
                    </Grid>
                    <Grid item>
                        <Switch
                            checked={checked}
                            onChange={() => setChecked(!checked)}
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

export default SessionManager;

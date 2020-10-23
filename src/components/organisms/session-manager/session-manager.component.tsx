import React, { ReactElement, Fragment, useState } from "react";
import { connect } from "react-redux";
import { selectSessionType } from "../../../redux/session/session.selectors";
import { RootState } from "../../../redux/root.reducer";
import { setSessionType } from "../../../redux/session/session.actions";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Local
import useSessionManagerStyles from "./styles";
import { SessionManagerPropType } from "./types";

const SessionManager = ({
    setSessionType,
    sessionType,
}: SessionManagerPropType): ReactElement => {
    const classes = useSessionManagerStyles();

    const handleChangeSessionType = () => {
        sessionType === "stat"
            ? setSessionType("energy")
            : setSessionType("stat");
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
                            checked={sessionType === "stat"}
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

const mapStateToProps = (state: RootState) => ({
    sessionType: selectSessionType(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSessionType: (value: any) => dispatch(setSessionType(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionManager);

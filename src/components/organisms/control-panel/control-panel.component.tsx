import React, { ReactElement, FC, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser, setTooltipToggle } from "../../../redux/user/user.actions";
import HelpIcon from "@material-ui/icons/Help";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
// Organisms
import Rank from "../rank/rank.component";
import StatsAndEnergies from "../stats-and-energies/stats-and-energies.component";
import SessionManager from "../session-manager/session-manager.component";
import Timer from "../timer/timer.component";
// Local
import useControlPanelStyles from "./styles";
import { ControlPanelType } from "./types";
import { selectTooltipToggle } from "../../../redux/user/user.selectors";

const ControlPanel: FC<ControlPanelType> = ({
    setUser,
    setTooltipToggle,
    tooltipToggle,
}: ControlPanelType): ReactElement => {
    const classes = useControlPanelStyles();

    const logout = () => {
        setUser({
            token: null,
        });
    };

    const toggleTooltips = () => {
        setTooltipToggle({ tooltipToggle: !tooltipToggle });
    };

    return (
        <Fragment>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.paper,
                }}
                anchor="right"
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleTooltips}>
                        {tooltipToggle ? <HelpIcon /> : <HelpOutlineIcon />}
                    </IconButton>
                    <IconButton component={Link} to={"/profile"}>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton
                        onClick={logout}
                        component={Link}
                        to={"/signInSignUp"}
                    >
                        <ExitToAppIcon />
                    </IconButton>
                </div>
                <Divider />
                <Rank />
                <Divider />
                <StatsAndEnergies />
                <Divider />
                <SessionManager />
                <Timer />
            </Drawer>
        </Fragment>
    );
};

const mapStateToProps = (state: any) => ({
    tooltipToggle: selectTooltipToggle(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setUser: (value: any) => dispatch(setUser(value)),
    setTooltipToggle: (value: any) => dispatch(setTooltipToggle(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

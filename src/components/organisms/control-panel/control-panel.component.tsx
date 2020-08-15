import React, { ReactElement, FC, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
// Organisms
import Rank from "../rank/rank.component";
import StatsAndEnergies from "../stats-and-energies/stats-and-energies.component";
// Local
import useControlPanelStyles from "./styles";

const ControlPanel: FC = (): ReactElement => {
    const classes = useControlPanelStyles();
    return (
        <Fragment>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.paper,
                }}
                anchor="right"
            >
                <Rank />
                <Divider />
                <StatsAndEnergies />
                <Divider />
            </Drawer>
        </Fragment>
    );
};

export default ControlPanel;

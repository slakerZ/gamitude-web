import React, { ReactElement, FC, Fragment } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Atoms
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
// Organisms
import Rank from "../rank/rank.component";
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
                <div className={classes.toolbar} />
                <Divider />
                <Rank />
                <Divider />
            </Drawer>
        </Fragment>
    );
};

export default ControlPanel;

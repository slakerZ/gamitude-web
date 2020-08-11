import React, { ReactElement, FC, Fragment } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Local
import useNavigationStyles from "../navigation/styles";

const ControlPanel = () => {
    const classes = useNavigationStyles();
    return (
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
            <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <CustomIcon size="small" variant={"logo"} />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default ControlPanel;

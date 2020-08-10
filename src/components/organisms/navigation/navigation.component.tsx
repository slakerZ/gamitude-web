import React, { ReactElement, FC } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import CustomIcon from "../../atoms/custom-icon/custom-icon.component";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
// Local
import useNavigationStyles from "./styles";
import navLinks from "./constants";
import { NavigationProps } from "./types";

const Navigation: FC<NavigationProps> = ({
    children,
}: NavigationProps): ReactElement => {
    const classes = useNavigationStyles();
    const [open, setOpen] = React.useState(false);

    const handlToggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx(classes.paper, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handlToggleOpen}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {navLinks.map(({ to, label, icon }) => (
                        <ListItem button key={to} component={Link} to={to}>
                            <ListItemIcon>
                                <CustomIcon size="small" variant={icon} />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {children}
        </div>
    );
};
export default Navigation;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/sloth.svg";

const useStyles = makeStyles({
    root: {
        width: "100vw",
        position: "fixed",
        bottom: 0,
        left: 0,
    },
});

export default function NavigationMobile() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const iconStylesMobile = { width: "4vh", height: "4vh" };

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                component={Link}
                to="/"
                label="Home"
                icon={<Logo style={iconStylesMobile} />}
            />
            <BottomNavigationAction
                component={Link}
                to="/projects"
                label="Projects"
                icon={<ProjectsIcon style={iconStylesMobile} />}
            />
            <BottomNavigationAction
                component={Link}
                to="/bulletJournal"
                label="Bullet Journal"
                icon={<BulletJournalIcon style={iconStylesMobile} />}
            />
        </BottomNavigation>
    );
}

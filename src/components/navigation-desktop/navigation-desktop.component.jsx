import React from "react";
import { Link } from "react-router-dom";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/sloth.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as GuestIcon } from "../../assets/icons/guest.svg";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: "100vw",
    },
    icons: {
        width: "6vh",
        height: "6vh",
    },
});

export default function NavigationDesktop() {
    // Tests
    const isSignedIn = false;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="Gamitude's Navigation"
            >
                <Tab
                    icon={<Logo className={classes.icons} />}
                    aria-label="Home"
                    component={Link}
                    to="/"
                    label="Home"
                />
                <Tab
                    icon={<ProjectsIcon className={classes.icons} />}
                    aria-label="Projects"
                    component={Link}
                    to="/projects"
                    label="Projects"
                />
                <Tab
                    icon={<BulletJournalIcon className={classes.icons} />}
                    aria-label="Bullet Journal"
                    component={Link}
                    to="/bulletJournal"
                    label="Bullet Journal"
                />
                {isSignedIn ? (
                    <Tab
                        icon={<ProfileIcon className={classes.icons} />}
                        component={Link}
                        to="/profile"
                        label="Profile"
                    />
                ) : (
                    <Tab
                        icon={<GuestIcon className={classes.icons} />}
                        component={Link}
                        to="/signInSignUp"
                        label="Sign In / Sign Up"
                    />
                )}
            </Tabs>
        </Paper>
    );
}

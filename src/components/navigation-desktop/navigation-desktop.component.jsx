import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// SVG's
import { ReactComponent as ProjectsIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as BulletJournalIcon } from "../../assets/icons/journal.svg";
import { ReactComponent as Logo } from "../../assets/icons/sloth.svg";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: "100vw",
    },
});

export default function NavigationDesktop() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const iconStyles = { width: "6vh", height: "6vh" };
    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon tabs example"
            >
                <Tab
                    icon={<Logo style={iconStyles} />}
                    aria-label="Home"
                    component={Link}
                    to="/"
                />
                <Tab
                    icon={<ProjectsIcon style={iconStyles} />}
                    aria-label="Projects"
                    component={Link}
                    to="/projects"
                />
                <Tab
                    icon={<BulletJournalIcon style={iconStyles} />}
                    aria-label="Bullet Journal"
                    component={Link}
                    to="/bulletJournal"
                />
            </Tabs>
        </Paper>
    );
}

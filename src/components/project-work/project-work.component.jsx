import React from "react";
// UI core
import { makeStyles } from "@material-ui/core";
import Input from "@material-ui/core/Input";
// Components
import ProjectTimer from "../project-timer/project-timer.component.jsx";
import ProjectToggle from "../project-toggle/project-toggle.component.jsx";

const ProjectWork = ({ index }) => {
    const useStyles = makeStyles({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
    });
    const classes = useStyles();

    const [time, setTime] = React.useState(0);

    const onChange = event => {
        const value = event.target.value;
        const isNum = /^\d+$/.test(value);

        if (isNum) {
            const isValidTime = value > 0 && value <= 360;
            if (isValidTime) {
                setTime(value);
            }
        } else if (value.length === 0) {
            setTime(0);
        }
    };

    return (
        <div>
            <div className={classes.container}>
                <ProjectTimer index={index} />
                <ProjectToggle index={index} time={time} />
            </div>
            <br />
            <Input
                value={time === 0 ? "" : time}
                placeholder={"Custom Time"}
                onChange={onChange}
            />
        </div>
    );
};

export default ProjectWork;

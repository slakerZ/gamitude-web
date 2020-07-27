import React from "react";
import { connect } from "react-redux";
// Selectors
import { selectProjects } from "../../../redux/projects/projects.selectors";
// UI core
import { makeStyles } from "@material-ui/core";
import Input from "@material-ui/core/Input";
// Components
import ProjectTimer from "../project-timer/project-timer.component";
import ProjectStopWatch from "../project-stopwatch/project-stopwatch.component";
import ProjectToggle from "../project-toggle/project-toggle.component";

const ProjectWork = ({ index, projects }) => {
    const method = projects[index].method;

    const useStyles = makeStyles({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
    });
    const classes = useStyles();

    const [time, setTime] = React.useState(0);

    const onChange = (event) => {
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
            {method === "infinite" ? (
                <div className={classes.container}>
                    <ProjectStopWatch index={index} />
                    <ProjectToggle index={index} time={time} />
                </div>
            ) : (
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
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    projects: selectProjects(state),
});

export default connect(mapStateToProps)(ProjectWork);

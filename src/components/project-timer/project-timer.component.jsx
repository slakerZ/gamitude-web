import React from "react";
import Timer from "react-compound-timer";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { selectProjects } from "../../redux/projects/projects.selectors";
import { connect } from "react-redux";

const ProjectTimer = ({ index, projects }) => {
    const time = projects[index].method;
    const timeForTimer = time * 60 * 1000;
    return (
        <Timer
            initialTime={timeForTimer}
            direction="backward"
            lastUnit="m"
            startImmediately={false}
            formatValue={value => `${value < 10 ? `0${value}` : value}`}
            checkpoints={[
                {
                    time: 60 * 1000,
                    callback: () =>
                        console.log("1 minute left...*playing sound*"),
                },
                {
                    time: 0,
                    callback: () => console.log("Updating stats...."),
                },
            ]}
        >
            {({ start, stop, reset }) => (
                <div>
                    <Typography component="h4" variant="h4">
                        <Timer.Minutes />:
                        <Timer.Seconds />
                    </Typography>
                    <div>
                        <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="contained primary button group"
                        >
                            <Button onClick={start}>Start</Button>
                            <Button onClick={stop}>Stop</Button>
                            <Button onClick={reset}>Reset</Button>
                        </ButtonGroup>
                    </div>
                </div>
            )}
        </Timer>
    );
};

const mapStateToProps = state => ({
    projects: selectProjects(state),
});

export default connect(mapStateToProps)(ProjectTimer);

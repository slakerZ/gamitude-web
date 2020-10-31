import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { a11yProps } from "../../atoms/tab-panel/tab-panel.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TimerIcon from "@material-ui/icons/Timer";
import useMethodsStyles from "./styles";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
import { setSelectedMethod } from "../../../redux/methods/methods.actions";
import { MethodsPropType } from "./types";
import { AddAlarm } from "@material-ui/icons";
import { ReduxStateType } from "../../../redux/root.reducer";
import { selectMethods } from "../../../redux/methods/methods.selectors";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const Methods = ({ methods, setSelectedMethod }: MethodsPropType) => {
    const classes = useMethodsStyles();
    const [method, setMethod] = useState(0);
    const [open, setOpen] = useState(false);

    const postMethod = () => {
        console.log("I'am an api placeholder");
    };

    const handleMethodChange = (e: any, newValue: any) => {
        setMethod(newValue);
        setSelectedMethod(newValue);
    };

    const handleOpenDialog = (e: any) => {
        setOpen(true);
    };

    const handleCloseDialog = (e: any) => {
        setOpen(false);
    };

    useEffect(() => {
        setSelectedMethod(0);
    }, []);

    return (
        <div className={classes.root} aria-label="methods root">
            <Tabs
                aria-label="list of custom methods"
                value={method}
                onChange={handleMethodChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
            >
                {methods.map(({ label }, index) => {
                    return (
                        <Tab
                            className={classes.tab}
                            key={index}
                            label={label}
                            {...a11yProps(index, "custom-method")}
                            icon={<TimerIcon />}
                        />
                    );
                })}
            </Tabs>
            <IconButton
                aria-label={"add new method"}
                className={classes.addMethod}
                onClick={handleOpenDialog}
            >
                <ToggleAbleTooltip target={"method"}>
                    <AddAlarm />
                </ToggleAbleTooltip>
            </IconButton>
            <Dialog
                open={open}
                aria-labelledby="add new method"
                onClose={handleCloseDialog}
            >
                <DialogTitle id="add new method">
                    {"Add new method"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={postMethod}>{"SAVE"}</Button>
                    <Button onClick={handleCloseDialog}>{"CANCEL"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state: ReduxStateType) => ({
    methods: selectMethods(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedMethod: (value: number) => dispatch(setSelectedMethod(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Methods);

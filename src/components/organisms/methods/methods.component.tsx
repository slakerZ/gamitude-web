import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { a11yProps } from "../../atoms/tab-panel/tab-panel.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { METHODS } from "./constants";
import TimerIcon from "@material-ui/icons/Timer";
import useMethodsStyles from "./styles";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";
import { setSessionMethod } from "../../../redux/session/session.actions";
import { MethodsPropType } from "./types";
import { SessionMethodType } from "../../../redux/session/types";

const Methods = ({ setSessionMethod }: MethodsPropType) => {
    const classes = useMethodsStyles();
    const [method, setMethod] = useState(0);

    const handleMethodChange = (e: any, newValue: any) => {
        setMethod(newValue);
        setSessionMethod(METHODS[newValue]);
    };

    return (
        <Fragment>
            <Tabs
                aria-label="list of custom methods"
                value={method}
                onChange={handleMethodChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
            >
                {METHODS.map(({ label }, index) => {
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
        </Fragment>
    );
};

const mapDispatchToProps = (dispatch: any) => ({
    setSessionMethod: (value: SessionMethodType) =>
        dispatch(setSessionMethod(value)),
});

export default connect(null, mapDispatchToProps)(Methods);

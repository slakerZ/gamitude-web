import React, { Fragment, useState } from "react";
import { a11yProps } from "../../atoms/tab-panel/tab-panel.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { METHODS } from "./constants";
import TimerIcon from "@material-ui/icons/Timer";
import useMethodsStyles from "./styles";
import ToggleAbleTooltip from "../../atoms/toggleable-tooltip/toggleable-tooltip.component";

const Methods = () => {
    const classes = useMethodsStyles();
    const [value, setValue] = useState(0);
    const [method, setMethod] = useState(METHODS[0]);

    const handleMethodChange = (e: any, newValue: any) => {
        setValue(newValue);
        setMethod(METHODS[newValue]);
    };

    return (
        <Fragment>
            <Tabs
                value={value}
                onChange={handleMethodChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs example"
            >
                {METHODS.map(({ label }, index) => {
                    return (
                        <ToggleAbleTooltip target="method" key={index}>
                            <Tab
                                className={classes.tab}
                                label={label}
                                {...a11yProps(index, "custom-method")}
                                icon={<TimerIcon />}
                            />
                        </ToggleAbleTooltip>
                    );
                })}
            </Tabs>
        </Fragment>
    );
};

export default Methods;

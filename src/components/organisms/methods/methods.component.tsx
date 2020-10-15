import React, { Fragment, useState } from "react";
import { a11yProps } from "../../atoms/tab-panel/tab-panel.component";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { METHODS } from "./constants";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useMethodsStyles from "./styles";

const Methods = () => {
    const classes = useMethodsStyles();
    const [value, setValue] = useState(0);

    const handleMethodChange = (e: any, newValue: any) => {
        console.log(newValue);
        setValue(newValue);
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
                {METHODS.map(({ label, name, minutes }, index) => {
                    return (
                        <Tab
                            className={classes.tab}
                            label={label}
                            key={index}
                            {...a11yProps(index, "custom-method")}
                            icon={<FavoriteIcon />}
                        />
                    );
                })}
            </Tabs>
        </Fragment>
    );
};

export default Methods;

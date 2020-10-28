import React, { ReactElement } from "react";
import Box from "@material-ui/core/Box";
import { TabPanelProps, a11yType } from "./types";

export const TabPanel = (props: TabPanelProps): ReactElement => {
    const { children, value, index, role, id, ...other } = props;

    return (
        <div
            role={role}
            hidden={value !== index}
            id={`${id}-${index}`}
            aria-labelledby={`${id}-${index}`}
            {...other}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </div>
    );
};

export const a11yProps = (index: string | number, id: string): a11yType => {
    return {
        id: `${id}-${index}`,
        "aria-controls": `${id}-${index}`,
    };
};

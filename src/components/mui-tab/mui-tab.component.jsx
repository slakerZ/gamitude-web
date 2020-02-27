import React from "react";
// UI Core
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const MuiTab = props => {
    const { children, value, currTab, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== currTab}
            {...other}
        >
            {value === currTab && <Box p={0}>{children}</Box>}
        </Typography>
    );
};

export default MuiTab;

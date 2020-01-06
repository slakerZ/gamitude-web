import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import PropTypes from "prop-types";

const ProjectTab = props => {
    const { children, value, currTab, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== currTab}
            id={`simple-tabpanel-${currTab}`}
            aria-labelledby={`simple-tab-${currTab}`}
            {...other}
        >
            {value === currTab && <Box p={0}>{children}</Box>}
        </Typography>
    );
};
ProjectTab.propTypes = {
    children: PropTypes.node,
    currTab: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default ProjectTab;

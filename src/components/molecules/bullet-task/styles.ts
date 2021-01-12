import { CONTROL_PANEL_WIDTH } from "App/constants";

import { makeStyles } from "@material-ui/core/styles";

const useProjectTaskStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    fabWrapper: {
        position: "fixed",
        bottom: 0,
        right: `${CONTROL_PANEL_WIDTH}vw`,
        padding: theme.spacing(1.5),
    },
    add: {
        boxShadow: "5px 5px 10px #000000",
        backgroundColor: theme.palette.secondary.main,
    },
    task: {
        backgroundColor: theme.palette.primary.dark,
    },
}));

export default useProjectTaskStyles;

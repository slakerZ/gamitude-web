import { makeStyles, Theme } from "@material-ui/core/styles";

const useLoadingScreenStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.primary.light,
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            zIndex: 2,
        },
        fixed: {
            position: "fixed",
        },
        relative: {
            position: "relative",
        },
        progress: {
            color: theme.palette.common.white,
            margin: theme.spacing(2),
        },
    };
});

export default useLoadingScreenStyles;

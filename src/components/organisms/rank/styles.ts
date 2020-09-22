import { makeStyles } from "@material-ui/core/styles";

const useRankStyles = makeStyles((theme) => {
    return {
        root: {
            width: "20vw",
        },
        avatarWrapper: {
            padding: theme.spacing(1.3),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        badgeWrapper: {
            backgroundColor: theme.palette.secondary.dark,
            padding: theme.spacing(1.5),
            border: `2px ${theme.palette.primary.light} outset`,
            borderRadius: "100%",
        },
        rank: {
            width: "20vh",
            height: "20vh",
            border: `7px ${theme.palette.primary.light} outset`,
        },
        placeholder: {
            width: "20vh",
            height: "20vh",
        },
    };
});

export default useRankStyles;

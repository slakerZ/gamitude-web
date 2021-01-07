import { makeStyles } from "@material-ui/core/styles";

const useRankStyles = makeStyles((theme) => {
    return {
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            userSelect: "none",
        },
        avatarWrapper: {},

        rank: {
            width: "20vh",
            height: "20vh",
            border: `7px ${theme.palette.primary.light} outset`,
        },
        placeholder: {
            width: "20vh",
            height: "20vh",
            borderRadius: "100%",
        },
    };
});

export default useRankStyles;

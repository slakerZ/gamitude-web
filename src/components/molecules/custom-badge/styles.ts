import { makeStyles } from "@material-ui/core/styles";

const useCustomBadgeStyles = makeStyles((theme) => ({
    badgeButton: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1.5),
        border: `2px ${theme.palette.primary.light} outset`,
        borderRadius: "100%",
        "&.Mui-disabled": {
            opacity: 0.5,
        },
    },
    badgeWrapper: {
        backgroundColor: theme.palette.secondary.dark,
        padding: theme.spacing(1.5),
        border: `2px ${theme.palette.primary.light} outset`,
        borderRadius: "100%",
    },
}));

export default useCustomBadgeStyles;

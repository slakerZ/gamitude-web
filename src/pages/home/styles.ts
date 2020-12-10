import { makeStyles } from "@material-ui/core/styles";

const useHomePageStyles = makeStyles(() => ({
    root: {
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
}));

export default useHomePageStyles;

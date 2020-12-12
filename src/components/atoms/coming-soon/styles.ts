import { makeStyles, Theme } from "@material-ui/core/styles";

const soonImg = require("assets/images/not-implemented.jpg");

const useComingSoonStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.primary.light,
            backgroundSize: "cover",
            backgroundImage: `url(${soonImg})`,
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            zIndex: 2,
            position: "relative",
        },
        banerText: {
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            padding: theme.spacing(3, 14),
            "& > *": {
                margin: theme.spacing(1, 0),
            },
        },
    };
});

export default useComingSoonStyles;

import { ReactComponent as FailedEmail } from "assets/icons/failedEmail.svg";
import { ReactComponent as EmailVerifyIcon } from "assets/icons/verifyEmail.svg";

import React, { Fragment, ReactElement } from "react";
import { Link, useParams } from "react-router-dom";
import { useAsyncFn, useEffectOnce } from "react-use";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { postVerifyOwnEmail } from "api/users/users.api";

import useSignInUpStyles from "./styles";
import { EmailVerifyUrlParams } from "./types";

const EmailVerfiedPage = (): ReactElement => {
    const { name, token } = useParams<EmailVerifyUrlParams>();
    const classes = useSignInUpStyles();

    const [verifyEmailState, verifyEmail] = useAsyncFn(async () => {
        const result = await postVerifyOwnEmail(name, token);
        return result;
    }, [name, token]);

    useEffectOnce(() => {
        verifyEmail();
    });

    return (
        <Fragment>
            <Toolbar />
            {verifyEmailState.loading ? (
                <CircularProgress />
            ) : verifyEmailState.error ? (
                <Fragment>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.center}>
                                <FailedEmail width={"70vw"} height={"70vh"} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.center}>
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    paragraph
                                >
                                    {"Email verification failed"}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    component="h4"
                                    paragraph
                                >
                                    {"Use button below to try again"}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={verifyEmail}
                                >
                                    {"Retry"}
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Fragment>
            ) : (
                <Fragment>
                    <Grid container>
                        <Grid item sm={12} lg={6}>
                            <div className={classes.center}>
                                <EmailVerifyIcon
                                    width={"70vw"}
                                    height={"70vh"}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={12} lg={6}>
                            <div className={classes.center}>
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    paragraph
                                >
                                    {"Email Successfully verified"}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    component="h4"
                                    paragraph
                                >
                                    {
                                        "Use button below to go back to login page"
                                    }
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/signInSignUp"
                                    variant="contained"
                                >
                                    {"Return to login page"}
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Fragment>
            )}
        </Fragment>
    );
};

export default EmailVerfiedPage;

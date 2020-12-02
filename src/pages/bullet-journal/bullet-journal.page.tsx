import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { selectToken } from "redux/user/user.selectors";

import Bullet from "components/organisms/bullet-journal/bullet-journal.component";

interface BulletPageProps {
    token: string;
}

const BulletJournalPage = ({ token }: BulletPageProps) => {
    return !token ? <Redirect to="/signInSignUp" /> : <Bullet />;
};

const mapStateToProps = (state: any) => ({
    token: selectToken(state),
});

export default connect(mapStateToProps)(BulletJournalPage);

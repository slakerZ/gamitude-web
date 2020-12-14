import React, { ReactElement, Fragment } from "react";
import { Helmet } from "react-helmet";

import ComingSoon from "components/atoms/coming-soon/coming-soon.component";

const BulletJournalPage = (): ReactElement => {
    return (
        <Fragment>
            <ComingSoon />
            <Helmet>
                <title>{"Gamitude | Bullet Journal"}</title>
            </Helmet>
        </Fragment>
    );
};

export default BulletJournalPage;

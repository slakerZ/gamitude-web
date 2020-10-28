import React from "react";

import { useLax } from "use-lax";

import Header from "../../components/homepage/Header";
import Idea from "../../components/homepage/Idea";
import Metodologies from "../../components/homepage/Metodologies";
import Creators from "../../components/homepage/Creators";
import Bullet from "../../components/homepage/Bullet";
import Credits from "../../components/homepage/Credits";
import Elastic from "../../components/homepage/Elastic";
import Energy from "../../components/homepage/Energy";
import Rank from "../../components/homepage/Rank";
import Shop from "../../components/homepage/Shop";
import Stats from "../../components/homepage/Stats";

const HomePage = () => {
    useLax();
    return (
        <div>
            <Header />
            <Idea />
            <Metodologies />
            <Stats />
            <Energy />
            <Rank />
            <Elastic />
            <Bullet />
            <Shop />
            <Creators />
            <Credits />
        </div>
    );
};

export default HomePage;

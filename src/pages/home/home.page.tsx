import React from "react";

import { useLax } from "use-lax";

import Header from "../../components/atoms/homepage-header/Header";
import Idea from "../../components/atoms/homepage-idea/Idea";
import Metodologies from "../../components/atoms/homepage-metodologies/Metodologies";
import Creators from "../../components/atoms/homepage-creators/Creators";
import Bullet from "../../components/atoms/homepage-bullet/Bullet";
import Credits from "../../components/atoms/homepage-credits/Credits";
import Elastic from "../../components/atoms/homepage-elastic/Elastic";
import Energy from "../../components/atoms/homepage-energy/Energy";
import Rank from "../../components/atoms/homepage-rank/Rank";
import Shop from "../../components/atoms/homepage-shop/Shop";
import Stats from "../../components/atoms/homepage-stats/Stats";

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

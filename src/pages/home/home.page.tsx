import { useLax } from "use-lax";

import React from "react";

import Homepage from "components/organisms/homepage/homepage";

const HomePage = () => {
    useLax();
    return (
        <div>
            <Homepage />
        </div>
    );
};

export default HomePage;

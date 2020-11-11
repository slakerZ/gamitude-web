import Homepage from "../../components/organisms/homepage/homepage";
import React from "react";
import { useLax } from "use-lax";

const HomePage = () => {
    useLax();
    return (
        <div>
            <Homepage />
        </div>
    );
};

export default HomePage;

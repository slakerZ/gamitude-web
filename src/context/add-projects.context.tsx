import React, { useState, createContext } from "react";

export const AddProjectContext = createContext(undefined);

export const AddProjectProvider = ({
    children,
    value,
}: {
    children: any;
    value?: any;
}) => {
    const [name, setName] = useState("");
    const [boosted, setBoosted] = useState([]);
    const [dominant, setDominant] = useState("");

    const val = {
        name: name,
        setName: setName,
        boosted: boosted,
        setBoosted: setBoosted,
        dominant: dominant,
        setDominant: setDominant,
    };

    return (
        <AddProjectContext.Provider value={val}>
            {children}
        </AddProjectContext.Provider>
    );
};

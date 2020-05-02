import React, { useState, createContext } from "react";

export const AddProjectContext = createContext();

export const AddProjectProvider = ({ children }) => {
    const [name, setName] = useState("");
    const [boosted, setBoosted] = useState([]);
    const [dominant, setDominant] = useState("");

    return (
        <AddProjectContext.Provider
            value={{
                name: name,
                setName: setName,
                boosted: boosted,
                setBoosted: setBoosted,
                dominant: dominant,
                setDominant: setDominant,
            }}
        >
            {children}
        </AddProjectContext.Provider>
    );
};

import React, { useState, createContext, useContext } from "react";

type AddProjectContextType = {
    name: string;
    setName: (newName: string) => void;
    boosted: string[];
    setBoosted: (newBoosted: string[]) => void;
    dominant: string;
    setDominant: (newDominant: string) => void;
};

type Props = {
    children: React.ReactNode;
};

const AddProjectContext = createContext<AddProjectContextType | undefined>(
    undefined,
);

export const AddProjectProvider = ({ children }: Props) => {
    const [name, setName] = useState("");
    const [boosted, setBoosted] = useState([""]);
    const [dominant, setDominant] = useState("");

    return (
        <AddProjectContext.Provider
            value={{
                name,
                setName,
                boosted,
                setBoosted,
                dominant,
                setDominant,
            }}
        >
            {children}
        </AddProjectContext.Provider>
    );
};

export const useAddProjectContext = () => useContext(AddProjectContext);

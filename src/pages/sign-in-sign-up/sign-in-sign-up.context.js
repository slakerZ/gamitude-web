import React, { useState, createContext } from "react";

export const SignInUpContext = createContext();

export const SignInUpProvider = ({ children }) => {
    const [checked, setChecked] = useState(false);

    return (
        <SignInUpContext.Provider
            value={{
                data: checked,
                updateChecked: (newChecked) => {
                    setChecked(newChecked);
                },
            }}
        >
            {children}
        </SignInUpContext.Provider>
    );
};

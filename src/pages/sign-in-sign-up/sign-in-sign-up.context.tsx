import React, { useState, createContext, useContext } from "react";

export const SignInUpContext = createContext(undefined);

export const SignInUpProvider = ({ children }: { children: any }) => {
    const [checked, setChecked] = useState(false);

    const val = {
        data: checked,
        updateChecked: (newChecked: any) => {
            setChecked(newChecked);
        },
    };

    return (
        <SignInUpContext.Provider value={val}>
            {children}
        </SignInUpContext.Provider>
    );
};

export const useSignInSignUp = () => useContext(SignInUpContext);

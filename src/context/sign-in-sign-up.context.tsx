import React, { useState, createContext } from "react";

const defaultState = { data: true, updateChecked: () => null };
export const SignInUpContext = createContext(defaultState);

type Props = { children: React.ReactNode; value?: any };

export const SignInUpProvider = ({ children, value }: Props) => {
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

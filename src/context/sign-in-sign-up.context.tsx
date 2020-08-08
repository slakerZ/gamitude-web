import React, { useState, createContext, useContext } from "react";

type SignInSignUpContextType = {
    checked: boolean;
    setChecked: (newChecked: boolean) => void;
};

type Props = {
    children: React.ReactNode;
};

const SignInUpContext = createContext<SignInSignUpContextType | undefined>(
    undefined,
);

export const SignInUpProvider = ({ children }: Props) => {
    const [checked, setChecked] = useState(false);

    return (
        <SignInUpContext.Provider value={{ checked, setChecked }}>
            {children}
        </SignInUpContext.Provider>
    );
};

export const useSignInUp = () => useContext(SignInUpContext);

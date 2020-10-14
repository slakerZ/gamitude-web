import React, { useState, createContext, useContext } from "react";

type SignInSignUpContextType = {
    isSignUp: boolean;
    setIsSignUp: (newChecked: boolean) => void;
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
        <SignInUpContext.Provider
            value={{ isSignUp: checked, setIsSignUp: setChecked }}
        >
            {children}
        </SignInUpContext.Provider>
    );
};

export const useSignInUp = () => useContext(SignInUpContext);

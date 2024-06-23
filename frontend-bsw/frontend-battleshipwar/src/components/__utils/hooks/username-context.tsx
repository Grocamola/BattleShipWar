import { createContext, useContext, useState, ReactNode } from "react";

type ContextProps = {
    user: string;
    setUser: (user: string) => void;
    state: "signin" | "signup" | "playerList" | "twoTeams";
    setState: (value: "signin" | "signup" | "playerList" | "twoTeams") => void
};

export const UserContext = createContext<ContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string>("");
    const [state, setState] = useState<"signin" | "signup" | "playerList" | "twoTeams">("signin")

    return (
        <UserContext.Provider value={{ user, setUser, state, setState }}>
            {children}
        </UserContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }

    return context;
}
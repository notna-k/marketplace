import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import { UserT } from '../../../types/api';

interface UserProviderProps {
    children: ReactNode;
}

export type UserProviderT = {
    user: UserT | null
    setUser: (user: UserT | null) => void;
}

export const UserContext = createContext<UserProviderT | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
export const UserProvider: React.FC<UserProviderProps> = ({ children}) => {
    const [user, setCurrentUser] = useState<UserT | null>(null);

    const setUser = (user: UserT | null) => {
        setCurrentUser(user);
    };


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

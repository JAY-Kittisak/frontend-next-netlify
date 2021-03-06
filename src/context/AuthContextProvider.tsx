import React, { createContext, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Router from 'next/router'

import { User } from '../types'
import { ME } from '../apollo/queries'

interface Props {}

type Actions = 'signup' | 'signin' | 'request' | 'reset' | 'close' | 'createFactory'

type HandleAuthAction = (action: Actions) => void

// อันนี้จะเป็น Type
interface AuthContextValues {
    authAction: Actions;
    handleAuthAction: HandleAuthAction;
    loggedInUser: User | null; // ถ้า Login ให้เป็น User ถ้าไม่ Login ให้เป็น Null
    setAuthUser: (user: User | null) => void;
}


//อันนี้จะเป็นค่าเริ่มต้น
const initialState: AuthContextValues = {
  authAction: 'close',
  handleAuthAction: () => {},
  loggedInUser: null,
  setAuthUser: () => {},
}

export const AuthContext = createContext<AuthContextValues>(initialState)

const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const [authAction, setAuthAction] = useState<Actions>('close');
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // <---- ค่าเริ่มแรกให้เป็น Null
    //loggedInUser ใช้จัดการ Component อื่น หรือ จัดการ Show Option ต่างๆ ถ้า Login โชว์อะไรบ้าง ถ้าไม่ Login โชว์อะไรบ้าง

    const { data } = useQuery<{ me: User }>(ME);

    useEffect(() => {
        if (data?.me) setLoggedInUser(data.me);
    }, [data?.me]);

    useEffect(() => {
        const syncSignout = (e: StorageEvent) => {
            if (e.key === 'signout') {
                // Log user out
                setLoggedInUser(null);

                // Push user to home page
                Router.push('/');
            }
        };

        window.addEventListener('storage', syncSignout);

        return () => window.removeEventListener('storage', syncSignout);
    }, []);

    const handleAuthAction: HandleAuthAction = (action) => {
        setAuthAction(action);
    };

    const setAuthUser = (user: User | null) => setLoggedInUser(user);

    return (
        <AuthContext.Provider
            value={{
                authAction,
                handleAuthAction,
                loggedInUser,
                setAuthUser
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider

import React, { createContext, useCallback } from 'react';
import api from './../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextDate {
    name: string;
    signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

export const AuthProvider: React.FC = ({ children }) => {
    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        });

        console.log(response.data);
    }, []);

    return (
        <AuthContext.Provider value={{ name: 'Luan', signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
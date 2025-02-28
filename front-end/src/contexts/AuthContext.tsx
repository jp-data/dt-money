import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { api } from "../lib/axios";

interface AuthContextProps {
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => void
    createUser: (data: CreateUserInput) => Promise<void>;
    authenticatedUser: (data: CreateLogin) => Promise<{ access_token: string }>;
}

interface CreateUserInput {
    name: string
    email: string
    password: string
}

interface CreateLogin {
    email: string
    password: string
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem('token')
        return !!token
    })

    const login = (token: string) => {
        setIsAuthenticated(true)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('token')
    }

    const createUser = useCallback(async (data: CreateUserInput) => {
        const { name, email, password } = data

        const response = await api.post('/users', {
            name,
            email,
            password
        })
        return response.data
    }, [])

    const authenticatedUser = useCallback(async (data: CreateLogin) => {
        const { email, password } = data

        const response = await api.post('/users/login', {
            email,
            password
        })
        return response.data
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, createUser, authenticatedUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}


import { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to='/auth' />
    }

    return children
}
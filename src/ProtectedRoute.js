import { useContext } from 'react';
import { Navigate, Outlet } from "react-router";
import AuthContext from './AuthContext';

export const ProtectedRoute = ({children, redirectPath = "/login" }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return null; // or replace with a spinner
    }

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};
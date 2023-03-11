import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const location = useLocation();
    let is_authenticated = sessionStorage.getItem("auth");
    if (!is_authenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return props.children;
};

export default ProtectedRoute;

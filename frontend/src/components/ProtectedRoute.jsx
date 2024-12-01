import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authProxy } from "./AuthProxy";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkAuthorization = async () => {
            const authorized = await authProxy.isAuthorized();
            setIsAuthorized(authorized);
        };
        checkAuthorization();
    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
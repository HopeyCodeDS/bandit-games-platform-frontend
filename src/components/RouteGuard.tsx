import {ReactNode, useContext} from 'react';
import SecurityContext from '../context/SecurityContext.ts';
import {Navigate} from "react-router-dom";

export interface RouteGuardProps {
    children: ReactNode;
    allowedRoles?: string[];
}

function RouteGuard({children, allowedRoles = []}: RouteGuardProps) {
    const {isAuthenticated, loggedInUser, isProfileComplete} = useContext(SecurityContext);
    console.log("Authenticated:", isAuthenticated());
    console.log("User roles:", loggedInUser?.roles);
    console.log("Allowed roles:", allowedRoles);
    if (!isAuthenticated()) {
        console.log("User not authenticated. Redirecting to /");
        return <Navigate to="/" replace/>;
    }

    // Redirect users with incomplete profiles to the profile page
    if (!isProfileComplete && window.location.pathname !== '/profile') {
        return <Navigate to="/profile" replace/>;
    }


    // Role-based access check
    const roles = loggedInUser?.roles || [];
    const hasAccess = allowedRoles.length === 0 || roles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
        console.log("User lacks required roles. Redirecting to root.");
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
}

export default RouteGuard;
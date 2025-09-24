import {useContext} from 'react';
import SecurityContext from '../context/SecurityContext';

export const useAuth = () => {
    const {getUserId, isAuthenticated} = useContext(SecurityContext);

    return {
        userId: getUserId(),
        isAuthenticated: isAuthenticated(),
    };
};
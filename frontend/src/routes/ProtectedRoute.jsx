import {Navigate} from 'react-router';
import {useAuth} from '../context/AuthContext';

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    // Wait for the auth state to resolve
    if (loading) {
        return <div>Checking authentication ...</div>
    }

    // After loading, enforce the protection
    if (!isAuthenticated) {
        return <Navigate to = "/login" replace />
    }

    // Authenticated -> render protected component
    return children;
}

export default ProtectedRoute;


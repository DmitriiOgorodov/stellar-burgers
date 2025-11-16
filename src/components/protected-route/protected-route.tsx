import { Navigate, useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) return null;

  const isAuthenticated = Boolean(user);

  if (onlyUnAuth && isAuthenticated) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean; // если true — маршрут доступен только неавторизованным
};

// Защищённый маршрут с поддержкой редиректов по ТЗ
export const ProtectedRoute = ({ children, onlyUnAuth = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state) => state.user);

  // Пока не проверили авторизацию — ничего не рендерим (можно показать лоадер при желании)
  if (!isAuthChecked) return null;

  const isAuthenticated = Boolean(user);

  if (onlyUnAuth && isAuthenticated) {
    // Авторизованным нельзя на публичные страницы (login/register/forgot/reset)
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    // Неавторизованный пытается попасть на защищённый маршрут
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

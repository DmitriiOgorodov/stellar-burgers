import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading, user, isAuthChecked } = useSelector(
    (state) => state.user
  );
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Редирект после успешного логина
  useEffect(() => {
    const from = (location.state as { from?: Location })?.from?.pathname || '/';
    if (isAuthChecked && user) {
      navigate(from, { replace: true, state: {} });
    }
  }, [isAuthChecked, user, navigate, location.state]);

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

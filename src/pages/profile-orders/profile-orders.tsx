import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/feedSlice';
import { selectProfileOrders, selectProfileLoading } from '@selectors';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const loading = useSelector(selectProfileLoading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};

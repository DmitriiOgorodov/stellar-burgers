import { RootState } from '../store';

// Селекторы для публичной ленты
export const selectFeedOrders = (state: RootState) => state.feed.general.orders;
export const selectFeedTotal = (state: RootState) => state.feed.general.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.feed.general.totalToday;
export const selectFeedLoading = (state: RootState) =>
  state.feed.general.loading;
export const selectFeedError = (state: RootState) => state.feed.general.error;

// Селекторы для истории заказов пользователя
export const selectProfileOrders = (state: RootState) =>
  state.feed.profile.orders;
export const selectProfileLoading = (state: RootState) =>
  state.feed.profile.loading;
export const selectProfileError = (state: RootState) =>
  state.feed.profile.error;

// Удобный селектор для страницы /feed (совместим с текущим использованием)
export const selectFeed = (state: RootState) => ({
  orders: state.feed.general.orders,
  loading: state.feed.general.loading
});

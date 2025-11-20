import { RootState } from '../store';

// Селекторы для создания заказа
export const selectCreationOrder = (state: RootState) =>
  state.order.create.order;
export const selectCreationProcessing = (state: RootState) =>
  state.order.create.loading;
export const selectCreationError = (state: RootState) =>
  state.order.create.error;

// Селекторы для деталей заказа
export const selectOrderDetails = (state: RootState) =>
  state.order.details.order;
export const selectOrderDetailsLoading = (state: RootState) =>
  state.order.details.loading;
export const selectOrderDetailsError = (state: RootState) =>
  state.order.details.error;

import { RootState } from '../store';
import { TIngredient } from '@utils-types';

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;
export const selectIngredientById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((item: TIngredient) => item._id === id);

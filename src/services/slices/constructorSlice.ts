import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type ConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

type ConstructorState = {
  items: ConstructorItems;
};

const initialState: ConstructorState = {
  items: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // HMR/DevTools can occasionally produce an undefined nested state shape at runtime.
    // Defensively ensure the nested structure exists before mutations to avoid
    // "Cannot set properties of undefined" errors during dispatches.
    setBun(state, action: PayloadAction<TIngredient>) {
      if (!state.items) {
        // runtime safeguard
        state.items = { bun: null, ingredients: [] } as ConstructorItems;
      }
      state.items.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (!state.items) {
        state.items = { bun: null, ingredients: [] } as ConstructorItems;
      }
      state.items.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<string>) {
      if (!state.items) {
        state.items = { bun: null, ingredients: [] } as ConstructorItems;
      }
      state.items.ingredients = state.items.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      if (!state.items) {
        state.items = { bun: null, ingredients: [] } as ConstructorItems;
      }
      const { fromIndex, toIndex } = action.payload;
      const arr = state.items.ingredients;
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
    },
    clearConstructor(state) {
      // Always reset to the correct shape
      state.items = { bun: null, ingredients: [] };
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;

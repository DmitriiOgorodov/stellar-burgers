import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://example.com/image.png',
    image_mobile: 'https://example.com/image-mobile.png',
    image_large: 'https://example.com/image-large.png'
  }
];

describe('ingredientsSlice async thunk reducer', () => {
  it('устанавливает loading true когда fetchIngredients в ожидании', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    });

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('хранит ingredients когда fetchIngredients выполнен', () => {
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    });

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('хранит error message когда fetchIngredients отклонено', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

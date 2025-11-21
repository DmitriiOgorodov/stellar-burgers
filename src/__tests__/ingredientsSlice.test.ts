import reducer, { fetchIngredients } from '../services/slices/ingredientsSlice';

describe('ingredientsSlice', () => {
  it('pending: loading=true, error=null', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(undefined, action as any);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled: записывает ингредиенты и loading=false', () => {
    const payload = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: 'a',
        image_large: 'b',
        image_mobile: 'c'
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload };
    const state = reducer(undefined, action as any);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(payload);
  });

  it('rejected: error устанавливается и loading=false', () => {
    const error = { message: 'Network error' };
    const action = { type: fetchIngredients.rejected.type, error };
    const state = reducer(undefined, action as any);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
  });
});

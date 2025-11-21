import { rootReducer } from '../store';
import { initialState as constructorInitial } from '../slices/burgerConstructorSlice';
import { initialState as ingredientsInitial } from '../slices/ingredientsSlice';
import { initialState as userInitial } from '../slices/userSlice';
import { initialState as feedInitial } from '../slices/feedSlice';
import { initialState as orderInitial } from '../slices/orderSlice';

describe('rootReducer', () => {
  it('корректно возвращает initial state для каждого слайса', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.burgerConstructor).toEqual(constructorInitial);
    expect(state.ingredients).toEqual(ingredientsInitial);
    expect(state.user).toEqual(userInitial);
    expect(state.feed).toEqual(feedInitial);
    expect(state.order).toEqual(orderInitial);
  });
});

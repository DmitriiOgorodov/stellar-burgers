import store, { rootReducer } from '../services/store';
import { initialState as constructorInitial } from '../services/slices/burgerConstructorSlice';
import { initialState as ingredientsInitial } from '../services/slices/ingredientsSlice';
import { initialState as userInitial } from '../services/slices/userSlice';
import { initialState as feedInitial } from '../services/slices/feedSlice';
import { initialState as orderInitial } from '../services/slices/orderSlice';

describe('rootReducer', () => {
  it('корректно возвращает initial state для каждого слайса', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const storeState = store.getState();
    expect(state).toEqual(storeState);

    expect(state.burgerConstructor).toEqual(constructorInitial);
    expect(state.ingredients).toEqual(ingredientsInitial);
    expect(state.user).toEqual(userInitial);
    expect(state.feed).toEqual(feedInitial);
    expect(state.order).toEqual(orderInitial);
  });
});

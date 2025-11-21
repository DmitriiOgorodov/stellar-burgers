import constructorReducer, {
  addIngredient,
  clearConstructor,
  initialState,
  moveIngredient,
  removeIngredient
} from '../slices/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';

const createIngredient = (ingredients: Partial<TConstructorIngredient>) => ({
  _id: 'default-id',
  name: 'Ингредиент',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 150,
  image: 'image.png',
  image_large: 'image_large.png',
  image_mobile: 'image_mobile.png',
  id: 'default-id',
  ...ingredients
});

describe('burgerConstructorSlice reducer', () => {
  it('добавляет ингредиент', () => {
    const bun = createIngredient({ type: 'bun', id: 'bun-01', name: 'Булка' });

    const state = constructorReducer(initialState, {
      type: addIngredient.type,
      payload: bun
    });

    expect(state.bun).toEqual(bun);
  });

  it('замещение ингредиентов', () => {
    const firstBun = createIngredient({ type: 'bun', id: 'bun-01' });
    const secondBun = createIngredient({ type: 'bun', id: 'bun-02' });

    const firstState = constructorReducer(initialState, {
      type: addIngredient.type,
      payload: firstBun
    });

    const nextState = constructorReducer(firstState, {
      type: addIngredient.type,
      payload: secondBun
    });

    expect(nextState.bun).toEqual(secondBun);
  });

  it('добавляет начинку', () => {
    const ingredient = createIngredient({ type: 'main', id: 'main-01' });

    const state = constructorReducer(initialState, {
      type: addIngredient.type,
      payload: ingredient
    });

    expect(state.ingredients).toEqual([ingredient]);
  });

  it('удаляет ингредиенты по id', () => {
    const first = createIngredient({ type: 'main', id: 'main-01' });
    const second = createIngredient({ type: 'sauce', id: 'sauce-01' });
    const stateWithIngredients = {
      ...initialState,
      ingredients: [first, second]
    };

    const state = constructorReducer(stateWithIngredients, {
      type: removeIngredient.type,
      payload: first.id
    });

    expect(state.ingredients).toEqual([second]);
  });

  it('очищает конструктор', () => {
    const bun = createIngredient({ type: 'bun', id: 'bun-01' });
    const other = createIngredient({ type: 'main', id: 'main-01' });
    const filledState = {
      bun,
      ingredients: [other]
    };

    const state = constructorReducer(filledState, {
      type: clearConstructor.type
    });

    expect(state).toEqual(initialState);
  });

  it('меняет порядок ингредиентов', () => {
    const first = createIngredient({ type: 'main', id: 'main-01' });
    const second = createIngredient({ type: 'sauce', id: 'sauce-01' });
    const stateWithIngredients = {
      ...initialState,
      ingredients: [first, second]
    };

    const state = constructorReducer(stateWithIngredients, {
      type: moveIngredient.type,
      payload: { from: 0, to: 1 }
    });

    expect(state.ingredients).toEqual([second, first]);
  });
});

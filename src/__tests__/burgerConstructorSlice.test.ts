import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../services/slices/burgerConstructorSlice';

import { TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'bun.png',
  image_large: 'bun-large.png',
  image_mobile: 'bun-mobile.png'
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 3000,
  image: 'main.png',
  image_large: 'main-large.png',
  image_mobile: 'main-mobile.png'
};

describe('burgerConstructorSlice', () => {
  it('должен добавить булку в конструктор', () => {
    const state = reducer(undefined, addIngredient(bun));
    expect(state.bun).toBeTruthy();
    expect(state.bun?._id).toBe(bun._id);
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен добавить начинку в конструктор', () => {
    const state = reducer(undefined, addIngredient(main));
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe(main._id);
    // у добавленного элемента должен быть сгенерирован id
    expect(state.ingredients[0].id).toBeTruthy();
  });

  it('должен удалить ингредиент по id', () => {
    const withTwo = [reducer(undefined, addIngredient(main)), reducer(undefined, addIngredient(main))];
    const s0 = withTwo[0];
    const s1 = reducer(s0, addIngredient(main));
    const idToRemove = s1.ingredients[0].id;
    const s2 = reducer(s1, removeIngredient(idToRemove));
    expect(s2.ingredients.find((i) => i.id === idToRemove)).toBeUndefined();
  });

  it('должен менять порядок ингредиентов (moveIngredient)', () => {
    let state = reducer(undefined, addIngredient(main));
    state = reducer(state, addIngredient(main));
    state = reducer(state, addIngredient(main));
    const idsBefore = state.ingredients.map((i) => i.id);
    const from = 0;
    const to = 2;
    const movedId = idsBefore[from];
    const s2 = reducer(state, moveIngredient({ from, to }));
    expect(s2.ingredients[to].id).toBe(movedId);
  });

  it('clearConstructor должен очищать булку и начинки', () => {
    let state = reducer(undefined, addIngredient(bun));
    state = reducer(state, addIngredient(main));
    state = reducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});

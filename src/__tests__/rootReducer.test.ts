import { rootReducer } from '../services/store';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние при UNKNOWN_ACTION', () => {
    // Начальное состояние через @@INIT
    const expectedInitial = rootReducer(undefined, { type: '@@INIT' } as any);

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' } as any);
    expect(state).toEqual(expectedInitial);

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
  });
});

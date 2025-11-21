import { rootReducer } from '../services/store';

describe('rootReducer', () => {
  it('возвращает корректное начальное состояние при UNKNOWN_ACTION', () => {
    // Получаем эталонное начальное состояние через @@INIT
    const expectedInitial = rootReducer(undefined, { type: '@@INIT' } as any);

    // Проверяем, что при неизвестном экшене состояние такое же
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' } as any);
    expect(state).toEqual(expectedInitial);

    // Дополнительно убеждаемся, что ключевые срезы присутствуют
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('order');
  });
});

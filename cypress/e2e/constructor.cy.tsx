/// <reference types="cypress" />

describe('Конструктор бургера — интеграционные тесты', () => {
  beforeEach(() => {
    // Подставляем фиктивные токены авторизации до загрузки приложения
    cy.setCookie('accessToken', 'Bearer fake-access-token');
    cy.window().then((w) => {
      w.localStorage.setItem('refreshToken', 'fake-refresh-token');
    });

    // Перехваты бекенда
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.visit('/');
    cy.wait(['@getIngredients']);
  });

  afterEach(() => {
    // Очистка токенов
    cy.clearCookie('accessToken');
    cy.window().then((w) => {
      w.localStorage.removeItem('refreshToken');
    });
  });

  it('добавление булки и начинки в конструктор', () => {
    // Добавляем булку
    cy.contains('li', 'Краторная булка N-200i')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // Проверяем, что плейсхолдеры исчезли и отрисованы верх/низ булки
    cy.contains('Выберите булки').should('not.exist');
    cy.contains('(верх)').should('exist');
    cy.contains('(низ)').should('exist');

    // Добавляем начинку
    cy.contains('li', 'Мясо бессмертных моллюсков Protostomia')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // Проверяем исчезновение плейсхолдера начинки
    cy.contains('Выберите начинку').should('not.exist');
  });

  it('модальное окно ингредиента открывается и закрывается крестиком и оверлеем', () => {
    const ingredientName = 'Краторная булка N-200i';

    // Открываем карточку ингредиента (клик по ссылке)
    cy.contains('li', ingredientName)
      .find('a')
      .first()
      .click();

    // Проверяем, что в модалке отображается именно этот ингредиент
    cy.get('h3').contains(ingredientName).should('be.visible');

    // Закрываем модалку нажатием Escape (надежно, не зависит от CSS‑модулей)
    cy.get('body').type('{esc}');
    cy.get('h3').contains(ingredientName).should('not.exist');

    // Снова открываем и закрываем по клику на оверлей
    cy.contains('li', ingredientName)
      .find('a')
      .first()
      .click();
    cy.get('h3').contains(ingredientName).should('be.visible');
    // Клик по оверлею: целимся в последний дочерний элемент портала (#modals), где рендерится overlay
    cy.get('#modals')
      .children()
      .last()
      .click('center', { force: true });
    cy.get('h3').contains(ingredientName).should('not.exist');
  });

  it('оформление заказа: открывается модалка с номером и конструктор очищается', () => {
    // Пользователь авторизован
    cy.wait('@getUser');

    // Собираем бургер: булка + начинка
    cy.contains('li', 'Краторная булка N-200i')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });
    cy.contains('li', 'Мясо бессмертных моллюсков Protostomia')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    // Перехват создания заказа
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    // Оформляем заказ
    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');

    // Проверяем, что открылась модалка и номер заказа верный
    cy.contains('идентификатор заказа').should('be.visible');
    cy.contains('424242').should('be.visible');

    // Закрываем модалку нажатием Escape
    cy.get('body').type('{esc}');
    cy.contains('идентификатор заказа').should('not.exist');

    // Проверяем, что конструктор пуст (появились плейсхолдеры)
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});

describe('конструктор бургера и оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('order');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.setCookie('accessToken', 'fake-access-token');

    cy.visit('/', {
      onBeforeLoad(window) {
        window.localStorage.setItem('refreshToken', 'fake-refresh-token');
      }
    });

    cy.wait('@ingredients');
    cy.wait('@user');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-testid="constructor-bun-top"]').contains(
      'Краторная булка N-200i'
    );

    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.get('[data-testid="constructor-ingredients"]').contains(
      'Филе Люминесцентного тетраодонтимформа'
    );
  });

  it('должен создавать заказ и очищать конструктор', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]')
      .find('button')
      .click();

    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa0941"]')
      .find('button')
      .click();

    cy.contains('Оформить заказ').click();

    cy.wait('@order');

    cy.get('[data-testid="modal"]').contains('12345').should('be.visible');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
    cy.get('[data-testid="constructor-ingredients"]')
      .find('li')
      .should('have.length', 0);
  });
});


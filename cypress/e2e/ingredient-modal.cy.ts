describe('модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывает и закрывает модалку с данными ингредиента', () => {
    cy.get('[data-testid="ingredient-643d69a5c3f7b9001cfa093c"]').click();

    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal"]').within(() => {
      cy.contains('Краторная булка N-200i').should('be.visible');
      cy.contains('Калории, ккал').should('be.visible');
      cy.contains('420').should('be.visible');
    });

    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});


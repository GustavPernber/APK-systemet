describe('Site test', () => {
  const BASE_URL_DEV = Cypress.env('BASE_URL_DEV')

  it('Phone boots', () => {
    cy.viewport('iphone-x')
    cy.visit(BASE_URL_DEV)
    cy.contains('Information')
  })

  // it('Fetches data.', () => {
  //   cy.viewport('iphone-x')
  //   cy.visit(BASE_URL_DEV)
  //   cy.get('a').should('have.length.at.least', 15)
  // })

  // it('Sorts.', () => {
  //   cy.viewport('iphone-x')
  //   cy.visit(BASE_URL_DEV)
  //   cy.get('a').should('have.length.at.least', 15)
  //   cy.get('select').select('Lägsta pris', {force: true})
  //   cy.get('a').should('have.length.at.least', 15)
  // })

})
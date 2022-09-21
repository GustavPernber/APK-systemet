describe('Site test', () => {
  it('Phone boots', () => {
    cy.viewport('iphone-x')
    cy.visit('http://localhost:8888')
    cy.contains('Information')
  })

  it('Fetches data.', () => {
    cy.viewport('iphone-x')
    cy.visit('http://localhost:8888')
    cy.get('a').should('have.length.at.least', 15)
  })

  it('Sorts.', () => {
    cy.viewport('iphone-x')
    cy.visit('http://localhost:8888')
    cy.get('a').should('have.length.at.least', 15)
    cy.get('select').select('Lägsta pris', {force: true})
    cy.get('a').should('have.length.at.least', 15)
  })

})
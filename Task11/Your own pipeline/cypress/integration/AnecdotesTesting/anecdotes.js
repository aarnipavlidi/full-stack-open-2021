describe('Anecdotes', function() {
  it('Checking if homepage has right texts', function() {
    cy.visit('http://localhost:8000')
    cy.contains('Anecdotes')
    cy.contains('anekdootit ja backend, step1')
  })
  it('Checking that if user adds new anecdote, it will get saved to database', function() {
    cy.get('#inputValue').type('Creating now a test anecdote!')
    cy.get('#inputButton').click()
    cy.contains('Creating now a test anecdote!')
  })
})

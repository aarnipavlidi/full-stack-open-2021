describe('Pokedex', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })
  it('Pokemon called Charmander can be opened and has right content', function() {
    cy.get('#app').get('div').should('have.class', 'list-container').find('a').should('have.class', 'list-item').contains('charmander').click()
    cy.get('#app').get('div').should('have.class', 'pokemon-name').contains('charmander').get('div').should('have.class', 'pokemon-ability-type').contains('Hidden ability')
  })
})

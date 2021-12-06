/// <reference types="cypress" />

describe('Input search query, select filter, perform search by fi', () => {
    it('should have a search query section with input, select, and button', () => {
        cy.visit('/')

        cy.get('#petersen-marie').should('have.text', 'Petersen, Marie')

        cy.get('input[type="text"]').type('brazil')
        cy.get('select#selectFilter').select('nation')
        cy.get('#search-filters').should('have.length', 1).children().first().should('have.text', 'No filters applied')
        cy.get('#search-button').click()

        cy.get('tbody').children().should('have.length', 50)
        cy.get('#pereira-marinara').should('have.text', 'Pereira, Marinara')

        cy.get('input[type="text"]').clear().type('lima')
        cy.get('select#selectFilter').select('name')
        cy.get('#search-filters').should('have.length', 1).children().first().should('not.have.text', 'No filters applied')
        cy.get('#search-button').click()

        cy.get('tbody').children().should('have.length', 3)
        cy.get('#lima-vílmar').should('have.text', 'Lima, Vílmar')
    })
})

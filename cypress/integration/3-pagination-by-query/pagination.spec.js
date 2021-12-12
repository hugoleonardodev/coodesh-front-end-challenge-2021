/// <reference types="cypress" />

describe('Paginates through search query results', () => {
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

        cy.get('#pagination-next').click()

        cy.get('tbody').children().should('have.length', 2)
        cy.get('#lima-clem').should('have.text', 'Lima, Clem')

        cy.get('#pagination-last').click()

        cy.get('tbody').children().should('have.length', 1)
        cy.get('#araújo-licelima').should('have.text', 'Araújo, Licelima')

        cy.get('#pagination-first').click()

        cy.get('tbody').children().should('have.length', 2)
        cy.get('#lima-clem').should('have.text', 'Lima, Clem')

        cy.get('#pagination-prev').click()

        cy.get('tbody').children().should('have.length', 3)
        cy.get('#lima-vílmar').should('have.text', 'Lima, Vílmar')
    })
})

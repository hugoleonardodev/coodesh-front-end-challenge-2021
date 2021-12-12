/// <reference types="cypress" />

describe('Visit a invalid page', () => {
    it('should renders the 404 not found custom page with a link to go back do home', () => {
        cy.visit('/')
        cy.wait(2000)

        cy.viewport(360, 640)
        cy.wait(3000)

        cy.get('#header-nav-bar-toggler').click()
        cy.wait(2000)
        // cy.get('a').click()
        // cy.wait(1000)
        // cy.get('#petersen-marie').should('have.text', 'Petersen, Marie')
    })
})

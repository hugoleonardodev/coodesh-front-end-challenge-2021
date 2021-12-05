/// <reference types="cypress" />

describe('Application is running', () => {
    it('should open on http://localhost:5010/', () => {
        cy.visit('/')
        cy.get('.navbar-brand').should('have.text', ' Pharma Inc.')
    })
})

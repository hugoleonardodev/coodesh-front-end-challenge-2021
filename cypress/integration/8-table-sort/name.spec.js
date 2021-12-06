/// <reference types="cypress" />

describe('Visit home and sort table ascending and descending', () => {
    it('should be able to sort on both ascending and descending orders', () => {
        cy.visit('/')
        cy.wait(1000)

        cy.get('#sort-ascending').click()
        cy.wait(2000)

        cy.get('#sort-descending').click()
        cy.wait(2000)
    })
})

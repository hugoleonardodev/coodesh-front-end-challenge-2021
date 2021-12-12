/// <reference types="cypress" />

describe('Visit home and filter patients by genders', () => {
    it('should be able filter by female, male, or any gender', () => {
        cy.visit('/')
        cy.wait(1000)

        cy.get('#gender-dropdown-toggle').click()
        cy.wait(2000)

        cy.get('#female-gender').click()
        cy.wait(2000)

        cy.get('#gender-dropdown-toggle').click()
        cy.wait(2000)

        cy.get('#male-gender').click()
        cy.wait(2000)

        cy.get('#gender-dropdown-toggle').click()
        cy.wait(2000)

        cy.get('#any-gender').click()
        cy.wait(2000)
    })
})

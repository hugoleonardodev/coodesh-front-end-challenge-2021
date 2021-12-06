/// <reference types="cypress" />

describe('Application is running', () => {
    it('should open on http://localhost:5010/', () => {
        cy.visit('/')

        cy.get('.spinner-border').should('have.length', 1)
        cy.get('.spinner-border').first().should('have.length', 1)
        cy.get('.spinner-border').first().should('have.text', 'Loading...')

        cy.request('https://randomuser.me/api/?seed=PharmaInc&results=50')
          .should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.results).to.have.property('length').and.be.oneOf([50, 51])
            expect(response).to.have.property('headers')
          })

    })

    it('should have a nav bar brand logo with icon', () => {
        cy.get('.navbar-brand').should('have.length', 1)
        cy.get('.navbar-brand').should('have.text', ' Pharma Inc.')
        cy.get('.navbar-brand').children().first().should('have.property', 'height')
        cy.get('.navbar-brand').children().first().should('have.property', 'width')
    })

    it('should have a menu dropdown with avatar', () => {
        cy.get('li .dropdown-toggle.nav-link').should('have.length', 1).should('have.text', '  Hugo Leonardo')
        cy.get('li .dropdown-toggle.nav-link').children().should('have.length', 1)
        cy.get('.dropdown-menu').should('have.length', 2)
    })

    it('should have a search query section with input, select, and button', () => {
        cy.get('input[type="text"]').should('have.length', 1)
        cy.get('input[type="text"]').next().should('have.length', 1).should('have.text', 'Search for...')
        cy.get('select#selectFilter').should('have.length', 1)
        cy.get('#search-filters').should('have.length', 1).children().first().should('have.text', 'No filters applied')
        cy.get('#search-button').should('have.length', 1).children().first().should('have.attr', 'xmlns').and('be.a', 'string').and('equal', 'http://www.w3.org/2000/svg')
    })

    it('should have a table with and a header with #, Name, Gender, Birth, and, Actions columns', () => {
        cy.get('table').should('have.length', 1)
        cy.get('thead').should('have.length', 1).children().should('have.length', 1)
        cy.get('thead').children().should('have.length', 1)
        cy.get('thead').children().children().should('have.length', 5)
        cy.get('thead').children().children().first().should('have.text', '#')
        cy.get('thead').children().children().first().next().should('have.text', 'Name ')
        cy.get('thead').children().children().first().next().next().should('have.text', 'GenderFemaleMaleAny')
        cy.get('thead').children().children().last().prev().should('have.text', 'Birth')
        cy.get('thead').children().children().last().should('have.text', 'Actions')
    })

    it('table should have 50 rows with 50 patients', () => {
        cy.get('tbody').should('have.length', 1)
        cy.get('tbody').children().should('have.length', 50)
    })
})

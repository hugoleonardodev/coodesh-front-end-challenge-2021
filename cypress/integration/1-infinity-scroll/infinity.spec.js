/// <reference types="cypress" />

describe('Scrolls down the screen to check Inifity Scroll behaviour', () => {
    it('should scroll down loading more pages', () => {
        cy.visit('/')

        cy.get('tbody').children().first().should('have.length', 1)
        cy.get('tbody').children().first().first().should('have.length', 1)
        cy.get('tbody').children().first().first().should('have.text', 1)
        cy.get('#petersen-marie').should('have.text', 'Petersen, Marie')

        cy.get('#infinity-scroll-bottom-reference').scrollIntoView()
        cy.request('https://randomuser.me/api/?seed=PharmaInc&results=50&page=2')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.results).to.have.property('length').and.be.oneOf([50, 51])
          expect(response).to.have.property('headers')
        })
        cy.wait(1000)


        cy.get('#infinity-scroll-bottom-reference').scrollIntoView()
        cy.request('https://randomuser.me/api/?seed=PharmaInc&results=50&page=3')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.results).to.have.property('length').and.be.oneOf([50, 51])
          expect(response).to.have.property('headers')
        })
        cy.wait(1000)

        cy.get('#infinity-scroll-bottom-reference').scrollIntoView()
        cy.request('https://randomuser.me/api/?seed=PharmaInc&results=50&page=4')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.results).to.have.property('length').and.be.oneOf([50, 51])
          expect(response).to.have.property('headers')
        })
    })
})

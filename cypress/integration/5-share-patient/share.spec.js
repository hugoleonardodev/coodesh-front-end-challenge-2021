/// <reference types="cypress" />

describe('Scroll through the screen and select a patient to share', () => {
    it('should be able to scroll, open and close modal, scroll agai, open and share', () => {
        cy.visit('/')

        cy.get('#petersen-marie').should('have.text', 'Petersen, Marie')

        cy.get('#infinity-scroll-bottom-reference').scrollIntoView()
        cy.wait(2000)

        cy.get('#patient-id-421aafba-df4a-4451-a33e-3d6ce58c7413').scrollIntoView()

        cy.get('#patient-id-421aafba-df4a-4451-a33e-3d6ce58c7413').click()
        cy.wait(2000)

        cy.get('#modal-close-button').click()
        cy.wait(1000)

        cy.get('#patient-id-421aafba-df4a-4451-a33e-3d6ce58c7413').scrollIntoView()
        // cy.wait(1000)

        cy.get('#patient-id-c0991f16-e25a-4509-89e9-1752f93be16f').click()
        cy.wait(2000)

        cy.get('#modal-share-button').click()
        cy.wait(2000)

        cy.get('#copy-to-clipboard').click()
        cy.wait(2000)

        cy.get('#back-to-list').click()
        cy.wait(1000)

        cy.get('#table-share-patient-ed48dd6b-f695-4cab-b5e5-4899bd008455').scrollIntoView()
        // cy.wait(1000)

        cy.get('#table-share-patient-ed48dd6b-f695-4cab-b5e5-4899bd008455').click()
        cy.wait(2000)

        cy.get('#copy-to-clipboard').click()
        cy.wait(2000)

        cy.get('#back-to-list').click()
        cy.wait(1000)
    })
})

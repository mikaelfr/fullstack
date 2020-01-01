describe('Blog app', function() {
  const user = {
    name: 'Test User',
    username: 'testeraccount',
    password: 'testpassword'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('[data-cy=login-username]').type(user.username)
      cy.get('[data-cy=login-password]').type(user.password)
      cy.get('[data-cy=login-submit]').click()
    })

    it('logging in works', function() {
      cy.contains(`${user.name} logged in`)
    })
  
    it('logging out works', function() {
      cy.contains(`${user.name} logged in`)
      cy.get('[data-cy=logout-button]').click()
      cy.contains('Log in to application')
    })

    it('user table contains test user', function() {
      cy.contains('Users').click()
      cy.get('[data-cy=users-table]').contains('Test User')
    })

    describe('when blog added', function() {
      beforeEach(function() {
        cy.contains('New blog').click()
        cy.get('[data-cy=add-title]').type('Test title')
        cy.get('[data-cy=add-author]').type('Test author')
        cy.get('[data-cy=add-url]').type('test-url')
        cy.get('[data-cy=add-submit]').click()
      })

      it('adding blog works', function() {
        cy.get('[data-cy=blog-table]').contains('Test title by Test author')
      })
  
      it('initial likes 0', function() {
        cy.get('[data-cy=blog-link]').click()
        cy.contains('0 likes')
      })
  
      it('liking works', function() {
        cy.get('[data-cy=blog-link]').click()
        cy.contains('Like').click()
        cy.contains('1 like')
      })
  
      it('adding comments works', function() {
        cy.get('[data-cy=blog-link]').click()
        cy.get('[data-cy=comment-value]').type('test comment')
        cy.get('[data-cy=comment-submit]').click()
        cy.get('[data-cy=comments-table]').contains('test comment')
      })

      it('removing blog works', function() {
        cy.get('[data-cy=blog-link]').click()
        cy.contains('Remove').click()
        cy.get('[data-cy=blog-table]').contains('Test title by Test author').should('not.exist')
      })
    })
  })
})
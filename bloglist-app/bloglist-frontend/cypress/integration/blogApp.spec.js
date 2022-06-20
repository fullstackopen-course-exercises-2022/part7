

describe('Blog APP', function() {
    beforeEach( function() {
        cy.request('POST', 'http://localhost:3001/api/test/reset')
        cy.visit('http://localhost:3000')

        const user = {
            name: 'Emmanuel Okuchukwu',
            username: 'emmanz95',
            password: 'Password@123?'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('open login form', function() {
        cy.contains('Login').click()
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function () {
            cy.request('POST', 'http://localhost:3001/api/users/auth', {
                username: 'emmanz95', password: 'Password@123?'
            }).then((response) => {
                localStorage.setItem('userInfo', JSON.stringify(response.body))
            })
        })

        it('fails with incorrect credentials', function() {
            cy.contains('Login').click()
            cy.get('#username').type('emmanz')
            cy.get('#password').type('Password')
            cy.get('#error').contains('[ERROR]: Password and username mismatch!')
        })
    })
})

describe('Blog app', function() {
    beforeEach(function() {
        cy.login({ username: 'emmanz95', password: 'Password@123?' })
    })
    it('A blog can be created', function() {
        const formData = {
            title: 'Fullstack 0 to Hero 2 hours!',
            author: 'Emmanuel',
            url: 'https://medium.com/@sharvishi9118/following-dry-principle-for-api-calls-in-react-a8e5ba3ab0b5',
            likes: 2,
        }
        cy.createBlog(formData)
    })
    it('user can like blog', function() {
        cy.contains('View')
            .click()
        cy.get('#like-btn')
            .click()
        cy.get('#like-btn')
            .click()
    })
    it('user can delete blog', function() {
        cy.contains('View').click()
        cy.get('#delete-btn').click()
    })
})
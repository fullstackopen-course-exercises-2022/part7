Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/users/auth', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('userInfo', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', (blogData) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: blogData,
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})

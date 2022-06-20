import React, { useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import './app.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'
import { PrivateRoute } from './privateRoute'
import UsersView from './components/UsersView'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import { Navbar, Container, Nav } from 'react-bootstrap'

const App = () => {
  const currentUser = useSelector(state => state.auth)
  const { user } = currentUser
  const viewRef = useRef()
  const signOut = (evt) => {
    evt.preventDefault()
    window.localStorage.removeItem('userInfo')
    window.location.href = '/'
  }
    return(
    <div>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/blogs">BlogList</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
              <Nav>
                {!user ? '' : (
                  <>
                    <Nav.Link href="">
                      Logged in as {user?.userInfo?.username}
                    </Nav.Link>
                    <Nav.Link eventKey={2} onClick={signOut}>
                      Sign Out
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Notification />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/blogs' element={<PrivateRoute><Blog viewRef={viewRef} /></PrivateRoute>} />
          <Route path='/users' element={<PrivateRoute><UsersView /></PrivateRoute>} />
          <Route path='/user/:userId' element={<PrivateRoute><SingleUser /></PrivateRoute>} />
          <Route path='/blog/:postId' element={<PrivateRoute><SingleBlog /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
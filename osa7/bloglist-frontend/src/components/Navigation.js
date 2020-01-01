import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = (props) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    props.history.push('/')
    window.location.reload()
  }

  const displayUser = () => <>{props.user.name} logged in <Button data-cy="logout-button" onClick={handleLogout} size="sm">Logout</Button></>

  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to={'/'}>Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to={'/users'}>Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {props.user ? displayUser() : null}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Navigation))
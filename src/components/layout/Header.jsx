import React, { useContext } from 'react'
import styles from './Header.module.css'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import LogoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../context/AuthContext'
const Dlink = ( { slug, end, title, children } ) => {
    return<Nav.Link as="span">

        <NavLink className={styles.navLink} to={slug} end={!!end}>
            {title}{children}
        </NavLink>
    </Nav.Link>

}
const Header = () => {
    const { isAuth, user, logout } = useContext(AuthContext);
    return (
      <header className={styles.header}>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Dlink slug="/">
              <img src={LogoImg} alt="Elhadba Logo" />
              {isAuth && user.email}
            </Dlink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Dlink slug="/" title={"Home"} end />
                <Dlink slug="/blog" title={"Blog"} end />
                  {!isAuth && (
                  <>
                    <Dlink slug="/login" title={"Login"} end />
                    <Dlink slug="/register" title={"signup"} end />
                  </>
                )}
                {isAuth && <Dlink slug="/blog/new" title={"New Post"} end />}
                {isAuth && (
                  <Button variant="outline-warning" onClick={logout}>
                    logout
                  </Button>
                )}

                {/* <Nav.Link >Link</Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
}

export default Header

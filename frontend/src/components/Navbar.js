import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo1 from '../utility/logo1.png';
import Button from 'react-bootstrap/Button';

const Navigationbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
    navigate('/home');
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{
          backgroundColor: 'white',
          height: '80px',
          paddingTop: '0',
          paddingBottom: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Container>
          <Navbar.Brand onClick={handleLogoClick}>
            <img
              src={logo1}
              width="140"
              height="70"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <Nav.Link onClick={() => handleNavLinkClick('/home')}>Home</Nav.Link>
              <Nav.Link onClick={() => handleNavLinkClick('/aboutus')}>About Us</Nav.Link>
              <Nav.Link onClick={() => handleNavLinkClick('/contactus')}>Contact Us</Nav.Link>
            </Nav>
            <Nav className="ml-auto" style={{ display: 'flex', alignItems: 'center' }}>
              {!user && (
                <>
                  <Link to="/login">
                    <Button
                      type="submit"
                      variant="primary"
                      style={{ marginRight: '10px' }}
                      onClick={() => handleNavLinkClick('/login')}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      variant="primary"
                      onClick={() => handleNavLinkClick('/signup')}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              {user && (
                <div>
                  <Link to="/">
                    <span>Welcome {user.fname}</span>
                  </Link>
                  <Button
                      type="submit"
                      variant="outline-danger"
                      style={{ marginRight: '10px' }}
                      onClick={handleClick}
                    >
                      Log out
                    </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const NavbarComponent = () => {
  return <Navigationbar />;
};

export default NavbarComponent;

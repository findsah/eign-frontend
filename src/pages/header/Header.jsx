import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from "react-bootstrap";
import logo from '../../assets/images/logo.png';
import LoginModal from '../../components/modals/LoginModal';
import SignupModal from '../../components/modals/SignupModal';


const Header = () => {
  const [firstName, setFirstName] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [selected, setSelected] = useState("English");
  const languages = ["English", "German", "Russian", "Chinese", "Japanese", "Urdu", "Hindi"];
  const token = sessionStorage.getItem('token')
  const [loginData, setLoginData] = useState();
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("userDetail"));
    // if (user) {
    //     if (!user.first_name)
    //         user.first_name = user['full name'].split(" ")[0]
    //     setFirstName(user?.first_name);
    // }
  }, []);

  const handleChange = (event) => {
    setSelected(event.target.value);
  }


  useEffect(() => {
    const userName = sessionStorage.getItem("userName");
    setFirstName(userName);
    setLoginData(sessionStorage.getItem("token"));
  }, [token]);  
  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
    setLoginData(null);
  };
  return (
    <header className="header">
      <Navbar expand="lg">
        <Navbar.Brand href="/" className="icon"><img src={logo} alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto mr-auto">
            <NavLink to="/sell" className="link" activeClassName="link active">Sell</NavLink>
            <NavLink to="/search" className="link" activeClassName="link active">Search</NavLink>
            {/* <NavLink to="/feature" className="link" activeClassName="link active">Feature</NavLink> */}
            <NavLink to="/experience" className="link" activeClassName="link active">Experience</NavLink>
            <NavLink to="/blog" className="link" activeClassName="link active">Blog</NavLink>
            <NavLink to="/about" className="link" activeClassName="link active">About Us</NavLink>
          </Nav>
          <Nav className="ms-auto dir">
            <select className="select" defaultValue={selected} onChange={handleChange}>
              {languages.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
            {loginData ? (
           <>
              <div className="welcomeMessage">Hi {firstName}</div>
              <button onClick={() => handleLogout()}>Logout</button>
           </>

            ) : (
              <button onClick={() => setShowLogin(true)}>Login</button>
            )}
            {/* <button onClick={() => setShowLogin(true)}>Login</button> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginModal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        // welcomeMessage={() => welcomeMessage("showLogin")}
        hideLoginShowSignUp={() => {
          setShowLogin(false);
          setShowSignUp(true);
        }}
      />
      <SignupModal
        show={showSignUp}
        onHide={() => setShowSignUp(false)}
        // welcomeMessage={() => welcomeMessage("showSignUp")}
        hideSignUpShowLogin={() => {
          setShowSignUp(false);
          setShowLogin(true);
        }}
      />
    </header>
  );
}

export default Header;

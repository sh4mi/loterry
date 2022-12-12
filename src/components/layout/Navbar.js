import { Layout, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import { Navbar, Nav,NavDropdown } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

import axios from "../../utils/axios";
import "../../styles/navbar.css";

const { Header } = Layout;

const NavBar = (props) => {
  const navigate = useNavigate();
  const onlyWidth = useWindowWidth()

  const [sticky, setSticky] = useState(false);
  const [name, setName] = useState('Ann');
  const [walletAddress, setWalletAddress] = useState(null); 
  const { loginHidden, wallet, signinHidden, aboutusHidden } = props;

  useEffect(() => {
    let _name = localStorage.getItem('name');
    let _wallet = localStorage.getItem('wallet');
    setWalletAddress(_wallet == 'undefined' ? null : _wallet);
    setName(_name);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else if (window.scrollY < 0) {
      setSticky(false);
    }
  };

  const logOut = () => {
    axios.post(`/api/auth/signout`)
      .then((res) => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('wallet');
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  const shortenHex = (hex, length = 4) => {
    return `${hex.substring(0, length + 2)}…${hex.substring(
      hex.length - length
    )}`;
  }

  return (
    <Navbar expand="lg" className={`header${sticky ? " sticky" : ""}`} >
      <LinkContainer to="/">
        <Navbar.Brand>
          <img
            src="/logo-default.png"
            width="100"
            height="44"
            className="d-inline-block align-top"
            alt="lottery"
          />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={"justify-content-end" + (onlyWidth < 769 ? " mobile-nav" : "")} >
        <Nav className="mr-0">
          {!aboutusHidden && (
            <LinkContainer to="/aboutus">
              <Nav.Link>About Us</Nav.Link>
            </LinkContainer>
          )}
          {!signinHidden && (
            <LinkContainer to="/signin">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          )}
          <NavDropdown className={loginHidden ? "nav-hidden" : ""} title={`Try your luck, ${name}`} id="basic-nav-dropdown">
            <LinkContainer to="/logout">
              <NavDropdown.Item onClick={() => logOut()} >Logout</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item>{walletAddress ? shortenHex(walletAddress) : (wallet ? shortenHex(wallet) : 'Wallet not connected')}</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

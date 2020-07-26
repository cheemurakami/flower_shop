import React from "react";
import { Nav, Navbar, Form, FormControl, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import gurumiIcon from "./images/gurumi_icon.png";
import gurumiHeader from "./images/gurumi_header.png";
import { connect } from 'react-redux';

function NavBar(props) {
  
  const signOut = () => {
    fetch('/users/sign_out', {
      method: "DELETE",
    })
    .then((response) => {
      console.log("LOGGED OUT")
    })
  }


  return (
    <>
      <Navbar bg="light" variant="dark">
        <Navbar.Brand as={Link} to="/">
          <img src={gurumiIcon} alt="gutumiIcon" />
        </Navbar.Brand>

        <Nav.Item>
          <Nav.Link className="link" as={Link} to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mr-auto">
          <Nav.Link className="link" eventKey="About us">
            About us
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Form inline className="justify-content-between">
            <FormControl
              type="text"
              placeholder="Search Flowers"
              className=" mr-sm-2"
            />
            <Button className="btn" variant="outline-secondary" type="submit">
              Search
            </Button>
          </Form>
        </Nav.Item>



        {/* if not sinedin */}
        <Nav.Item>
          <Nav.Link className="link" as={Link} to="/users/log_in">
            {props.currentUser && props.currentUser.email}
            Sign In
          </Nav.Link>
        </Nav.Item>

        {/* if sinedin */}
        <Nav.Item>
          <Nav.Link className="link" onClick={signOut} >
            Sign Out
          </Nav.Link>
        </Nav.Item>




      </Navbar>

      <div className="header">
        <img
          src={gurumiHeader}
          style={{ marginBottom: "30px" }}
          width="100%"
          alt="header"
          className="header2"
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    currentUser: state.loginStatusReducer.currentUser
  }
}

NavBar = connect(mapStateToProps)(NavBar);
export default NavBar;

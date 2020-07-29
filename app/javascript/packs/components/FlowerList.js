import React, { useEffect, useState } from "react";
import { Nav, Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import * as a from "../actions";

function FlowerList(props) {
  const history = useHistory();
  const location = useLocation();
  const { dispatch } = props; 
  //console.log(location);

  const handleClick = (id) => {
    history.push(`/flower/${id}`);
  };

  //const [flowers, setFlowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //This is what we want to happen when first loaded
  useEffect(() => {
    fetch("/api/flowers/")
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        // setFlowers(jsonifiedResponse);
        const action = a.loadedFlowers(jsonifiedResponse);
        dispatch(action);
        setIsLoading(false);
      });
    // get all flowers
    // then set all flowers to my state
    return () => {};
  }, [location]);

  const loadingMessage = () => {
    if (isLoading) {
      return <p>Loading</p>;
    }
  };

  const addButton = () => {
    if (props.currentUser && props.currentUser.admin) {
      return (
        <React.Fragment>
          <div className="text-center btn-container">
            <Link to="/newflowers">
              <Button variant="outline-secondary">
                Add a new flower to the list
              </Button>
            </Link>
          </div>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md={2} style={{ textAlign: "left" }}>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link href="/home">Active</Nav.Link>
              <Nav.Link eventKey="link-1">Link</Nav.Link>
              <Nav.Link eventKey="link-2">Link</Nav.Link>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={10} style={{ textAlign: "center", margin: "auto" }}>
            {addButton()}
            <Row>
              {props.flowers && props.flowers.map((flower) => (
                <Col
                  lg={3}
                  md={4}
                  sm={6}
                  key={flower.id}
                  onClick={() => handleClick(flower.id)}
                >
                  <Card
                    border="light"
                    style={{
                      width: "100%",
                      height: "380px",
                      marginBottom: "30px",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        flower.flower_photos[0] && flower.flower_photos[0].url
                      }
                    />

                    <Card.Body>
                      <Card.Title>{flower.title}</Card.Title>
                      <Card.Text>${flower.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {loadingMessage()}

      
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginStatusReducer.currentUser,
    flowers: state.flowerListReducer.flowers
  };
};

FlowerList = connect(mapStateToProps)(FlowerList);
export default FlowerList;

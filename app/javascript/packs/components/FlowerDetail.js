import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Carousel, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as a from "../actions";
import FavoriteBtn from "./FavoriteBtn";
import CartBtn from "./CartBtn";

function FlowerDetail(props) {
  const { id } = useParams();
  const [flower, setFlower] = useState({});
  const { dispatch } = props;

  function deleteHandler(event) {
    event.preventDefault();
    fetch(`/api/flowers/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const action = a.deletedFlower();
        dispatch(action);
      });
  }

  useEffect(() => {
    const action = a.loadedForm();
    dispatch(action);
    fetch(`/api/flowers/${id}`)
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        setFlower(jsonifiedResponse);
      });
    return () => {};
  }, []);

  const showDeletedMsgOrDetail = () => {
    if (props.showMsg) {
      return (
        <React.Fragment>
          <Container>
            <div style={{ textAlign: "center", margin: "auto" }}>
              <p>Successfully Deleted!</p>
              <Link to="/">
                <Button variant="outline-secondary" className="btn">
                  Back to List
                </Button>
              </Link>
            </div>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Container className="mt-5">
            <Row>
              <Col md={7} style={{ textAlign: "center", padding: "auto" }}>
                <Carousel fade={true}>
                  {flower.flower_photos &&
                    flower.flower_photos.map((image) => {
                      return (
                        <Carousel.Item key={image.id}>
                          <img
                            className="mr-3 d-block w-100"
                            src={image.url}
                            alt="Generic placeholder"
                            width="300px"
                          />
                        </Carousel.Item>
                      );
                    })}
                </Carousel>
              </Col>
              <Col
                md={5}
                style={{ textAlign: "center", padding: "auto", margin: "auto" }}
              >
                <h3>{flower.title}</h3>
                <p>{flower.description}</p>
                <p>Price: ${flower.price}</p>

                <h5>
                  {flower.tags &&
                    flower.tags.map((tag) => {
                      return (
                        <Badge pill variant="light" key={tag}>
                          {tag}
                        </Badge>
                      );
                    })}
                </h5>

                <FavoriteBtn
                  flowerId={flower.id}
                  isFavorite={flower.is_favorite}
                ></FavoriteBtn>

                <CartBtn
                  flowerId={flower.id}
                  isInCart={flower.is_in_cart}
                ></CartBtn>

                {editBtnAndDeleteBtn()}

                <Link to="/">
                  <Button variant="outline-secondary">Back to List</Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  };

  const editBtnAndDeleteBtn = () => {
    if (props.currentUser && props.currentUser.admin) {
      return (
        <React.Fragment>
          <div className="btn-container">
            <Link to={`/editflowers/${id}`}>
              <Button
                className="btn"
                variant="outline-secondary"
                className="mb-3"
              >
                Edit this flower
              </Button>
            </Link>
          </div>
          <div className="btn-container">
            <Button
              variant="outline-secondary"
              className="mb-3"
              onClick={deleteHandler}
            >
              Delete this flower
            </Button>
          </div>
        </React.Fragment>
      );
    }
  };

  return <React.Fragment>{showDeletedMsgOrDetail()}</React.Fragment>;
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.loginStatusReducer.currentUser,
    showMsg: state.flowerListReducer.showMsg,
  };
};
FlowerDetail = connect(mapStateToProps)(FlowerDetail);
export default FlowerDetail;

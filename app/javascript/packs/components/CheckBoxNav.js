import React from 'react'
import { Nav, Accordion, Form } from 'react-bootstrap'
import AccordionCustom from "./AccordionCustom";
import * as a from "../actions";
import { connect } from "react-redux";


function CheckBoxNav(props) {

  const { dispatch } = props;

  const occasionNames = ["Anniversary", "Birthday", "Romance", "Thank You", "Congratulations"]
  const flowerTypes = ["Daisy", "Lily", "Rose", "Tulip", "Sunflower"]
  const colors = ["Red", "Pink", "Yellow", "Puple", "Orange"]

  const changeHandler = (event) => {
    let checked = event.target.checked
    if (checked){
      fetch(`/api/flowers?search=${event.target.id}`)
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        const action = a.loadedFlowers(jsonifiedResponse);
        dispatch(action);
      })
    } else {
      fetch(`/api/flowers`)
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        const action = a.loadedFlowers(jsonifiedResponse);
        dispatch(action);
      })
    }
  }

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
    <Accordion defaultActiveKey="0">
      <AccordionCustom eventKey="0">
        Occasion
      </AccordionCustom>
      
        <Accordion.Collapse eventKey="0">
          <Form>
            {occasionNames.map((name) => {
              return (
                <Form.Group controlId={name} key={name}>
                  <Form.Check type="checkbox" label={name} onChange={changeHandler}/>
                </Form.Group>
              )
            })}
          </Form>
        </Accordion.Collapse>
    </Accordion>

    <Accordion defaultActiveKey="0">
      <AccordionCustom eventKey="0">
        Flower Type
      </AccordionCustom>
        <Accordion.Collapse eventKey="0">
          <Form>
            {flowerTypes.map((type) => {
              return(
                <Form.Group controlId={type} key={type}>
                  <Form.Check type="checkbox" label={type} onClick={changeHandler} />
                </Form.Group>
              )
            })}
          </Form>
        </Accordion.Collapse>
    </Accordion>

    <Accordion defaultActiveKey="0">
      <AccordionCustom eventKey="0">
        Color
      </AccordionCustom>
        <Accordion.Collapse eventKey="0">
          <Form>
            {colors.map((color) => {
              return (
                <Form.Group controlId={color} key={color}>
                  <Form.Check type="checkbox" label={color} onClick={changeHandler}/>
                </Form.Group>
              )
            })}
          </Form>
        </Accordion.Collapse>
    </Accordion>
  </Nav>
  )
}

CheckBoxNav = connect()(CheckBoxNav);
export default CheckBoxNav

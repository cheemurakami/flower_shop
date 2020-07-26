import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Signup from './Signup'
import Signin from './Signin'
import FlowerList from './FlowerList'
import FlowerCreateForm from './FlowerCreateForm'
import FlowerEditForm from './FlowerEditForm'
import FlowerDetail from './FlowerDetail'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import {connect} from 'react-redux'
import * as a from '../actions'


function App(props) {

  

  //func to check if signed in or not
  const checkLogin = () => {
    const { dispatch } = props;

    fetch("/signed_in")
      .then((response) => response.json())
      .then((jsonifiedResponse) => {
        let currentUser;

        if(jsonifiedResponse.user == null){
          currentUser = null;
          console.log("MUST SIGN IN")
        } else {
           currentUser = jsonifiedResponse.user;
          console.log("SIGNED IN AS", jsonifiedResponse)
        }




        const action = a.checkedLoginStatus(currentUser);
        dispatch(action);
        // console.log(jsonifiedResponse);
      });
      
  }

  useEffect(() => {
    console.log("Use effect")
    checkLogin();
    return () => {};
  }, []);


  return (
    <Router>
        <NavBar />
      <Switch>
        <Route path="/users/sign_up">
          <Signup />
        </Route>
        <Route path="/users/log_in">
          <Signin />
        </Route>
        <Route path="/newflowers">
          <FlowerCreateForm />
        </Route>
        <Route path="/flower/:id">
          <FlowerDetail />
        </Route>
        <Route path="/editflowers/:id">
          <FlowerEditForm />
        </Route>
        <Route path="/">
          <FlowerList />
        </Route>
      </Switch>
    </Router>
  )
}

App = connect()(App);

export default App;
